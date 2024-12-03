import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from './menu-item';
import { OrderItem } from './order-item';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, Timestamp, writeBatch} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItems: MenuItem[] = [];
  private totalPrice: number = 0;
  private orderSubject: BehaviorSubject<MenuItem[]>;

  constructor(private firestore:Firestore) {
    this.orderSubject = new BehaviorSubject<MenuItem[]>([]);

  }
  public get items(){
    return this.orderSubject.asObservable();
  }

  addItemToOrder(item: MenuItem): void {
    this.cartItems.push(item);
    this.totalPrice += item.price;
    this.orderSubject.next(this.cartItems);
  }
  deleteItem(index: number){
    this.cartItems.splice(index, 1);
    this.orderSubject.next(this.cartItems);
  }
  getOrderItems(): MenuItem[] {
    return this.cartItems;
  }
  
  getTotalPrice(): number {
    return Number(this.totalPrice);
  }

  getItemCount(): number {
    return this.cartItems.length;
  }

  getOrderSubject(): BehaviorSubject<MenuItem[]> {
    return this.orderSubject;
  }

  confirmOrder(email: string, Usuario: string, telf: string){
    const orderRef= collection(this.firestore, 'orders');
    const newOrder = {
      items: this.cartItems,
      totalPrice: Number(this.totalPrice),
      Email: email,
      User: Usuario,
      telf: telf,
      status: 'Pending'
    };
    addDoc(orderRef, newOrder);

    this.cartItems = [];
    this.totalPrice = 0;
    this.orderSubject.next(this.cartItems);
  }

  getOrders(): Observable<OrderItem[]> {
    const orderRef = collection(this.firestore, 'orders');
    return collectionData(orderRef, { idField: 'id' }) as Observable<OrderItem[]>;
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    const orderRef = doc(this.firestore, 'orders', orderId);
    updateDoc(orderRef, { status: newStatus });
  }
  storeReadyOrders(orders: OrderItem[]) {
    const dateKey = new Date().toISOString().split('T')[0]; // Get the current date as the key
    const batch = writeBatch(this.firestore);
    const readyOrdersCollectionRef = collection(this.firestore, 'readyOrders');
  
    // Create a new document for the current date
    const readyOrdersDocRef = doc(readyOrdersCollectionRef, dateKey);
  
    orders
      .filter(order => order.status === 'Ready') // Filter orders by status
      .forEach(order => {
        const orderData = { ...order, storedAt: Timestamp.now() };
        const subcollectionRef = collection(readyOrdersDocRef, 'orders');
        const orderRef = doc(subcollectionRef);
        batch.set(orderRef, orderData);
        const deleteOrderRef = doc(collection(this.firestore, 'orders'), order.id);
        batch.delete(deleteOrderRef);
      });
  
    return batch.commit()
      .then(() => {
        console.log('Ready orders stored successfully');
        // Remove the ready orders from the orderItems array or update their status as per your requirement
      })
      .catch((error) => {
        console.error('Error storing ready orders:', error);
      });
  }
  
}
