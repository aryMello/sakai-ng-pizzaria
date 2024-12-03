import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  constructor(private location: Location){

  }
  backHome(){
    this.location.back();
  }
}
