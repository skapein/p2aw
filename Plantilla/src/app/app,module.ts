import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EventosComponent } from './eventos/eventos.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    EventosComponent,
    ReservacionesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
