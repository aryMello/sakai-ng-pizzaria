import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';
import {Location} from '@angular/common';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{
  menuItems: MenuItem[] = [];
  item: any;
  login: boolean = false;
  Id1: string | undefined = '';
  constructor(private route: ActivatedRoute, private menuService: MenuService,private userService:UserService, private location: Location, private orderService: OrderService, private router: Router){
      // this.route.queryParams.subscribe(
      //   data => console.log(data)
      // )
      console.log('FIN',this.route.snapshot.paramMap.get('id'))
      this.Id1=this.route.snapshot.paramMap.get('id')?.toString();
      this.userService.stateUser().subscribe( res=> {
        if(res){
          console.log ('esta logueado');
          this.login=true;
        } else {
          console.log ('mno esta logueado');
          this.login=false;
        }
      })
  }
  ngOnInit(): void {
    this.getMenu(this.Id1);
  }
  addToCart(){
    console.log('AGREGANDO AL CARRITO.....')
  }

  getMenu(id:string | undefined){
    this.menuService.findMenuItem(id).then(menu=> this.item = menu.data());


    console.log('este es el resultado',this.menuService.findMenuItem(id));
  }
  goBack(){
    this.location.back();
  }
  addToOrder(item: MenuItem) {
    this.orderService.addItemToOrder(item);
    //this.router.navigate(['/Login'])
}
navigateToOrderSummary(login: boolean): void {
  if(login){
    this.router.navigate(['/OrderSummary']);
  }
  else{
    this.router.navigate(['/Login'])
  }
}

}
