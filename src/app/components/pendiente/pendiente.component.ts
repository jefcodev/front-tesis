import { Component, OnInit } from '@angular/core';
import { ModelPedidosI } from '../../modelos/modelo.pedidos';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos/pedidos.service';
import { ClientesService } from '../../servicios/clientes/clientes.service';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { GuardiasService } from '../../servicios/guardias/guardias.service';
import { DespachosService } from '../../servicios/despachos/despachos.service';
import { LoginService } from '../../servicios/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TinasService } from '../../servicios/tinas/tinas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pendiente',
  templateUrl: './pendiente.component.html',
  styleUrls: ['./pendiente.component.scss']
})
export class PendienteComponent implements OnInit {

  orders: ModelPedidosI[] = [];
  formPendiente = new FormGroup({
    id_pedido:new FormControl('', [Validators.required]),
    fecha_entrega: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),

  });



  constructor(private router: Router, private tinasService: TinasService, private pedidosService: PedidosService, private guardiasService: GuardiasService, private loginService: LoginService, private cookieService: CookieService, private pedidoServices: PedidosService,
    private clientesService: ClientesService, private dexServices: KardexService, private despachosService: DespachosService) { }

  ngOnInit(): void {
    this.showAllOrders();
    this.definirUser();
  }

  userLo: string = "";
  definirUser() {
    this.loginService.getUser(localStorage.getItem('tokenIC'))
      .subscribe((data: any) => {
        this.userLo = data.rol
      });
  }
  showAllOrders() {
    this.pedidoServices.getAllPendientes().subscribe(
      (orders: any) => {
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }


  getDataPedido(idPedido: any) {
    this.formPendiente.setValue({
      id_pedido: idPedido,
      fecha_entrega: null,
      usuario:this.userLo
    })
    // console.log(this.formPendiente)


  }

  despecharPedidopendiente(form: any) {
    if(this.formPendiente.valid){
      this.tinasService.getAllTinas().subscribe((dataA: any) => {
        this.pedidoServices.getDespacho(form.id_pedido).subscribe((dataB: any) => {
          if (dataA[0].stock > dataB.numero_tinas) {
            this.pedidoServices.despacharPendiente(form).subscribe((data: any) => {
              this.showAllOrders()
              this.showModalMore('center', 'success', 'Despachado exitosamente', false, 1500);
            })
          } else {
            Swal.fire({
              title: 'El número de huacales es insuficiente.',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        })
      })
    }else{
      this.ShowModal('Pedido', 'Debe ingresar la fecha de entrega', 'error');
    }
   


  }
  estadoP: boolean = true;

  ShowModal(title: any, infor: any, tipo: any) {
    Swal.fire(title, infor, tipo);
  }
  showModalMore(position: any, icon: any, title: any, showConfirmButton: any, timer: any) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }



}
