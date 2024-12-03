import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent{
  menuItems: MenuItem[] = [];
  item: any;
  Id1: string | undefined = '';
  whoAreWe: boolean = false;
  whatWeDo: boolean = false;
  mision: boolean = false;
  contato: boolean = false;
  vision: boolean = false;
  equipe: boolean = false;
  constructor(private location: Location, private menuService: MenuService, private router: Router){

  }

  quemSomos(){
    this.whoAreWe=true;
  }
  queFazemos(){
    this.whatWeDo=true;
  }
  nossaMissao(){
    this.mision=true;
  }
  nossoContato(){
    this.contato=true;
  }
  nossaVisao(){
    this.vision=true;
  }
  nossoTime(){
    this.equipe=true;
  }
  goBack(){
    this.location.back();
  }
  getMenu(id:string | undefined){
    this.menuService.findMenuItem(id).then(menu=> this.item = menu.data());


    console.log('resultado',this.menuService.findMenuItem(id));
  }
  goWhoWeAre(){
    this.router.navigate(['/Quem-somos']);
  }
  goContato(){
    this.router.navigate(['/Contato'])
  }
  goEquipe(){
    this.router.navigate(['/Equipe'])
  }

  onPecaAgora(){
    this.router.navigate(['/Login']);
  }


}
