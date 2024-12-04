import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { PizzaService } from 'src/app/demo/service/pizza.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from 'src/app/demo/components/pages/pedido/pedido.component';
import { PedidoService } from './demo/service/pedido.service';
import { ClienteService } from './demo/service/cliente.service';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';  // Adicionado caso use input text

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        CalendarModule, // Para o calendário
        AppLayoutModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule, // Necessário para [(ngModel)]
        MultiSelectModule, // Para multi-select
        HttpClientModule, // Necessário para chamadas de API
        InputTextModule, // Caso use input de texto (adicionado como exemplo)
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, PizzaService, PedidoService, ClienteService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
