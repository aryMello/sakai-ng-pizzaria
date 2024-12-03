import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.scss']
})
export class PizzasListComponent implements OnInit{

  menuItems: MenuItem[] = [];
  selectedMenuItem: MenuItem | undefined;
  constructor(private menuService:MenuService){
   
  }
  ngOnInit(): void{
    this.menuService.getPizzas().subscribe(menuItems=>{
      this.menuItems =menuItems;
    })
  }
  async onClickDelete(menuItem:MenuItem){
    const response= await this.menuService.deleteMenuItem(menuItem);
  }

  onClickEdit(menuItem: MenuItem){
    this.selectedMenuItem = menuItem;
    
    const menuEditForm = document.getElementById('menu-edit-form');
    if (menuEditForm) {
      menuEditForm.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  async onSubmit(){
    if (this.selectedMenuItem) {
      const response = await this.menuService.updateMenuItem(this.selectedMenuItem);
      this.selectedMenuItem = undefined;
    }
  }
}
