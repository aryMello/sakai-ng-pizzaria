import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-add-pizzas',
  templateUrl: './add-pizzas.component.html',
  styleUrls: ['./add-pizzas.component.scss']
})
export class AddPizzasComponent implements OnInit {

  form: FormGroup;
  constructor(private menuService:MenuService){
    this.form = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      imagePath: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }
  
  async onSubmit(){
    console.log(this.form.value);

    const menuItem= this.form.value;
    menuItem.price = Number(menuItem.price)
    
    const response = await this.menuService.addMenuItem(this.form.value);
    console.log(response);
  }

}
