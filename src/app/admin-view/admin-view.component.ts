import { Component } from '@angular/core';
import { AddPizzasComponent } from '../add-pizzas/add-pizzas.component';
import { PizzasListComponent } from '../pizzas-list/pizzas-list.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  AddPizzasComponent = AddPizzasComponent;
  PizzasListComponent= PizzasListComponent;
}
