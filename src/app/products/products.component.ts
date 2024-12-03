import { Component, OnInit} from '@angular/core';
import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirestoreDatosService } from '../firestore-datos.service';
import { Meta } from '@angular/platform-browser';
import { __metadata } from 'tslib';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {
  menuItems: MenuItem[] = [];
  login: boolean = false;
  rol: 'visitante' | 'admin' = 'visitante';
  item: any;

  constructor(
    private menuService: MenuService, 
    private orderService: OrderService,
    private router: Router, 
    private userService:UserService,
    private datosUser: FirestoreDatosService) {
      this.userService.stateUser().subscribe( res=> {
        if(res){
          console.log ('esta logado');
          this.login=true;
          this.getDatosUsuario(res.uid);
          console.log ('esta logogado',this.getDatosUsuario(res.uid));
        } else {
          console.log ('nao esta logado');
          this.login=false;
        }
      })
    }

  async ngOnInit() {
    this.menuService.getPizzas().subscribe(menuItems=>{
      this.menuItems= menuItems;
    })

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

  onClickLogout(){
    this.userService.logout() 
    .then(()=>{
      this.router.navigate(["/Products"]);
    })
    .catch(error=> console.log(error))
  }

  onClickLogin(){
    this.router.navigate(['/Login']);
  }

  getDatosUsuario(uid:string){
    const path = 'Usuarios';
    const id = uid;
    console.log('aqui uid ',id);
    this.datosUser.findObject(uid,path).then(data => this.item = data.data());

    console.log('2...este es el resultado', this.item);
  }
  goHome(){
    this.router.navigate(['/Home-View']);
  }
  
}
