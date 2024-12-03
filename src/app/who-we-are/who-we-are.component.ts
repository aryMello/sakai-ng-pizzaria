import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent {
constructor(private location: Location){
  
  }
  backHome(){
    this.location.back();
  }
}
