import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { GuardiasComponent } from './components/guardias/guardias/guardias.component';
import { PedidosComponent } from './components/pedidos/pedidos/pedidos.component';
import { CompedidosComponent } from './components/pedidos/compedidos/compedidos.component';
import { DespachosComponent } from './components/despachos/despachos.component';
import { IngresoInsumosComponent } from './components/ingreso-insumos/ingreso-insumos.component';
import { PrestamoTinasComponent } from './components/prestamo-tinas/prestamo-tinas.component';
import { CompdespachoComponent } from './components/despachos/compdespacho/compdespacho.component';
import { CompinsumosComponent } from './components/ingreso-insumos/compinsumos/compinsumos.component';
import { CompprestamoComponent } from './components/prestamo-tinas/compprestamo/compprestamo.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { TinasComponent } from './components/tinas/tinas.component';
import { ComprasComponent } from './components/compras/compras.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { RecicladasComponent } from './components/recicladas/recicladas.component';
import { ComrecicladasComponent } from './components/recicladas/comprecicladas/comrecicladas/comrecicladas.component';
import { HomeAComponent } from './components/homeA/home-a/home-a.component';
import { CompcompraComponent } from './components/compras/compcompra/compcompra.component';
import { KardexComponent } from './components/kardex/kardex.component';
import { UserGuardGuard } from './user-guard.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ModalpedidoComponent } from './components/modalpedido/modalpedido.component';
import { DetPedidosComponent } from './components/det-pedidos/det-pedidos.component';
import { DetDespachoComponent } from './components/det-despacho/det-despacho.component';
import { PendienteComponent } from './components/pendiente/pendiente.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard/homeA", pathMatch: "full" },
  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "home", component: HomeComponent },
      { path: "homeA", component: HomeAComponent },
      { path: "kardex", component: KardexComponent },
      { path: "cliente", component: ClientesComponent },
      { path: "autoridad", component: AutoridadesComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "tinas", component: TinasComponent },
      {
        path: "compras", component: ComprasComponent, children: [{
          path: "compcompra", component: CompcompraComponent
        }]
      },
      { path: "devoluciones", component: DevolucionesComponent },
      {
        path: "recicladas", component: RecicladasComponent, children:
          [{ path: "comprecicladas", component: ComrecicladasComponent }]
      },

      { path: "guardia", component: GuardiasComponent },
      {
        path: "despacho", component: DespachosComponent, children: [
          { path: "compdespacho", component: CompdespachoComponent }
        ]
      },
      {
        path: "insumo", component: IngresoInsumosComponent, children: [
          { path: "compinsumo", component: CompinsumosComponent }
        ]
      },
      {
        path: "prestamo", component: PrestamoTinasComponent, children: [
          { path: "compprestamo", component: CompprestamoComponent }
        ]
      },

      {
        path: "pedido", component: PedidosComponent, children: [
          { path: "compedido", component: CompedidosComponent },
          { path: "detpedido", component: DetPedidosComponent },
          { path: "detdespacho", component: DetDespachoComponent },
          { path: "pendiente", component: PendienteComponent }
        ]
      }
    ], canActivate: [UserGuardGuard]
  },
  { path: "login", component: LoginPageComponent },
  { path: "modal", component: ModalpedidoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
