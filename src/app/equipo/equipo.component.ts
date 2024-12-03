import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent {
  constructor(private location: Location){

  }
  backHome(){
    this.location.back();
  }

}
