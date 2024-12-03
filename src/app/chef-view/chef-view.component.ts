import { Component, Pipe, PipeTransform } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderItem } from '../order-item';

@Component({
  selector: 'app-chef-view',
  templateUrl: './chef-view.component.html',
  styleUrls: ['./chef-view.component.scss']
})
export class ChefViewComponent {

  orderItems: OrderItem[]=[];
  selectedOrder: OrderItem | undefined;
  constructor(private orderService:OrderService){}

  ngOnInit(): void{
    this.orderService.getOrders().subscribe(orderItems=>{
      this.orderItems= orderItems;
    })
  }
  updateOrderStatus(id: string, newStatus: string) {
    this.orderService.updateOrderStatus(id, newStatus);
  }
  storeReadyOrders() {
    this.orderService.storeReadyOrders(this.orderItems)
  }
  
}
