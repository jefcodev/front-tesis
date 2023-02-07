import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { GuardiasComponent } from './components/guardias/guardias/guardias.component';
import { CompedidosComponent } from './components/pedidos/compedidos/compedidos.component';
import { PedidosComponent } from './components/pedidos/pedidos/pedidos.component';
import { DespachosComponent } from './components/despachos/despachos.component';
import { PrestamoTinasComponent } from './components/prestamo-tinas/prestamo-tinas.component';
import { IngresoInsumosComponent } from './components/ingreso-insumos/ingreso-insumos.component';
import { CompdespachoComponent } from './components/despachos/compdespacho/compdespacho.component';
import { CompprestamoComponent } from './components/prestamo-tinas/compprestamo/compprestamo.component';
import { CompinsumosComponent } from './components/ingreso-insumos/compinsumos/compinsumos.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { TinasComponent } from './components/tinas/tinas.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CommonModule } from '@angular/common'
import { RecicladasComponent } from './components/recicladas/recicladas.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { ComrecicladasComponent } from './components/recicladas/comprecicladas/comrecicladas/comrecicladas.component';
import { HomeAComponent } from './components/homeA/home-a/home-a.component';
import { CompcompraComponent } from './components/compras/compcompra/compcompra.component';
import { KardexComponent } from './components/kardex/kardex.component';
// import {
//   MatDatepickerModule,
//   DateAdapter,
//   MAT_DATE_LOCALE,
//   MAT_DATE_FORMATS
// } from '@angular/material';
// import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ClientesComponent,
    GuardiasComponent,
    CompedidosComponent,
    PedidosComponent,
    DespachosComponent,
    PrestamoTinasComponent,
    IngresoInsumosComponent,
    CompdespachoComponent,
    CompprestamoComponent,
    CompinsumosComponent,
    AutoridadesComponent,
    TinasComponent,
    ComprasComponent,
    RecicladasComponent,
    DevolucionesComponent,
    ComrecicladasComponent,
    HomeAComponent,
    CompcompraComponent,
    KardexComponent,
    // CommonModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
