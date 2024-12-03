import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from './menu-item';
import { Firestore ,collection, addDoc, collectionData, doc, deleteDoc,updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuItems: MenuItem[] = [];
  constructor(private firestore:Firestore,){}

  addMenuItem(menuItem:MenuItem){
    const  menuItemsRef =collection(this.firestore, 'menuItems');
    return addDoc(menuItemsRef, menuItem);
  }
  
  getPizzas(): Observable<MenuItem[]>{
    const  menuItemRef =collection(this.firestore, 'menuItems');
    return collectionData(menuItemRef, {idField : 'id'}) as Observable<MenuItem[]>;
  }

  getPizza(ItemId: string){


  }

  deleteMenuItem(menuItem:MenuItem){
    const itemDocRef = doc(this.firestore,`menuItems/${menuItem.id}`);
    return deleteDoc(itemDocRef);

  }

  findMenuItem(id: string =''){
    const recItem = doc(this.firestore, `menuItems/${id}`);
    return getDoc(recItem);
  }

  updateMenuItem(menuItem:MenuItem){
    const menuItemRef= doc(this.firestore, `menuItems/${menuItem.id}`);
    const menuItemToUpdate: Partial<MenuItem> = { 
      name: menuItem.name,
      description: menuItem.description,
      imagePath: menuItem.imagePath,
      price: menuItem.price
    };
    return updateDoc(menuItemRef,menuItemToUpdate);
  }



}
