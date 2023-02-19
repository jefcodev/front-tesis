import { Component, OnInit } from '@angular/core';
import { PrestamoTinasService } from '../../../servicios/prestamo_tinas/prestamo-tinas.service';
import { TinasService } from '../../../servicios/tinas/tinas.service';
import { ModelPrestamosHomeI } from '../../../modelos/modelo.prestamoshome';
import { ModelTinasBI } from '../../../modelos/modelo.tinas';
import { PedidosService } from '../../../servicios/pedidos/pedidos.service';
import { ClientesService } from '../../../servicios/clientes/clientes.service';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.scss']
})
export class HomeAComponent implements OnInit {
  prestamosHome: ModelPrestamosHomeI[] = [];
  tinas: ModelTinasBI[] = [];
  stock: number | undefined;
  cliente: string | undefined;
  pedido: string | undefined;
  prestamo: string | undefined;

  constructor(private prestamosTinasServices: PrestamoTinasService,
    private tinasServices: TinasService,
    private pedidosService: PedidosService
    , private clientsServices: ClientesService) { }

  ngOnInit(): void {
    this.showAllPrestamosHome()
    this.showAll()

  }
  showAllPrestamosHome() {
    this.prestamosTinasServices.getAllPrestamoss().subscribe(
      (prestamosHome: any) => {
        this.prestamosHome = prestamosHome

      },
      (error) => console.log(error)
    );
  }
  showAll() {
    this.tinasServices.getAllTinas().subscribe(
      (tinas: any) => {
        this.stock = tinas[0]['stock'];
      },
      (error) => console.log(error)
    );
    this.clientsServices.getCountClients().subscribe(
      (clients: any) => {
        this.cliente = clients[0]['num_clients'];
      },
      (error) => console.log(error)
    );
    this.pedidosService.getCountOrders().subscribe(
      (pedido: any) => {
        this.pedido = pedido[0]['num_pedido'];
      },
      (error) => console.log(error)
    );


    this.prestamosTinasServices.getCountPrestamo().subscribe(
      (prestamo: any) => {
        this.prestamo = prestamo[0]['num_prestamo']
      },
      (error) => console.log(error)
    );
  }
}
