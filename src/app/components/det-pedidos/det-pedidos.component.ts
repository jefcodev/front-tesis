import { Component, OnInit } from '@angular/core';
import { ModelPedidosI } from 'src/app/modelos/modelo.pedidos';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModelClientesI } from 'src/app/modelos/modelo.clientes';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { identifierName } from '@angular/compiler/public_api';
import Swal from 'sweetalert2';
import { KardexService } from 'src/app/servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/servicios/login/login.service';
import { ModelGuardiasI } from 'src/app/modelos/modelo.guardias';
import { GuardiasService } from '../../servicios/guardias/guardias.service';
import { DespachosService } from '../../servicios/despachos/despachos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-det-pedidos',
  templateUrl: './det-pedidos.component.html',
  styleUrls: ['./det-pedidos.component.scss']
})
export class DetPedidosComponent implements OnInit {
  idpedidoV: string = "";
  activoA: boolean | undefined;
  activoB: boolean | undefined;
  changeActiveA() {
    this.activoA = true;
    this.activoB = false;

  }
  changeActiveB() {
    this.activoA = false;
    this.activoB = true;

  }


  formBitacora = new FormGroup({
    fecha_actual: new FormControl(''),
    movimiento: new FormControl(''),
    accion: new FormControl(''),
    cantidad: new FormControl(''),
    ayudante: new FormControl(''),
    cliente: new FormControl(''),
    observacion: new FormControl(''),
    numero_acta: new FormControl(''),
    usuario: new FormControl('')
  });


  clientes: ModelClientesI[] = [];
  fecha: "2000-03-20" | undefined;
  orders: ModelPedidosI[] = [];
  formPedidoA = new FormGroup({
    id_pedido: new FormControl(''),
    fecha_pedido: new FormControl(new Date),
    fecha_entrega: new FormControl('', [Validators.required]),
    cantidad_libras: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required])
  });


  constructor(private router: Router, private pedidosService: PedidosService, private guardiasService: GuardiasService, private loginService: LoginService, private cookieService: CookieService, private pedidoServices: PedidosService,
    private clientesService: ClientesService, private dexServices: KardexService, private despachosService: DespachosService) { }

  ngOnInit(): void {
    this.showAllOrders();
    // this.showAllClients();
    // this.fecha="2000-03-20";
    this.definirUser();
  }
  userLo: string = "";
  definirUser() {
    this.loginService.getUser(localStorage.getItem('tokenIC'))
      .subscribe((data: any) => {
        this.userLo = data.rol
      });
  }
  showAllClients() {
    this.clientesService.getAllClients().subscribe(
      (clientes: any) => {
        this.clientes = clientes

      },
      (error) => console.log(error)
    );
  }
  showAllOrders() {
    this.pedidoServices.getAllOrders().subscribe(
      (orders: any) => {
        this.orders = orders


      },
      (error) => console.log(error)
    );
  }
  getDataOrders(id_pedido: any, fecha_entrega: any, cantidad_libras:
    any, ruta: any, observaciones: any, cliente: any) {
    this.formPedidoA.patchValue({
      id_pedido: id_pedido,
      fecha_pedido: new Date,
      fecha_entrega: fecha_entrega,
      cantidad_libras: cantidad_libras,
      ruta: ruta,
      observasiones: observaciones,
      fk_tbl_cliente_cedula: null
    })
    console.log("Imprimiendo ", this.formPedidoA.valueChanges)

    this.showAllClients();
  }

  updateOrders(form: any) {
    if (this.formPedidoA.valid) {
      this.pedidoServices.updateOrders(form).subscribe(data => {

        this.showModalMore('center', 'success', 'Pedido actualizado correctamente', false, 1500);
        this.showAllOrders()
        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Pedido",
          accion: "Actualizar",
          cantidad: form.cantidad_libras,
          ayudante: "",
          cliente: form.fk_tbl_cliente_cedula,
          observacion: form.observasiones,
          numero_acta: "",
          usuario: this.userLo,
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Pedido', 'Error al actualizar pedido', 'error');

    }

  }
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
  get fecha_entrega() { return this.formPedidoA.get('fecha_entrega'); }
  get fk_tbl_cliente_cedula() { return this.formPedidoA.get('fk_tbl_cliente_cedula'); }
  get cantidad_libras() { return this.formPedidoA.get('cantidad_libras'); }
  get ruta() { return this.formPedidoA.get('ruta'); }
  get observasiones() { return this.formPedidoA.get('observasiones'); }



  //DESPACHAR

  showModal = false;
  guardias: ModelGuardiasI[] = [];

  formPedidoDetalle = new FormGroup({
    fecha_entrega: new FormControl(''),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required]),
    observacionesPrestamo: new FormControl('', [Validators.required])
  })
  formPedidoDetalleFinal = new FormGroup({
    id_pedido: new FormControl(new Date),
    fecha_actual: new FormControl(new Date),
    numero_tinas: new FormControl(''),
    fecha_entrega: new FormControl(''),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required]),
    observacionesPrestamo: new FormControl('', [Validators.required])
  })

  getDataPedido(id_pedido: any) {
    // alert(id_pedido)
    this.idpedidoV = id_pedido
    this.showModal = true;
    this.showAllGuards();
    // alert(this.idpedidoV)
    this.pedidosService.getnumTinasP(id_pedido).subscribe((data: any) => {
      let numTinas = parseInt(data[0].numero_tinas);
      if (numTinas > 0) {
        Swal.fire({
          title: 'El cliente seleccionado tiene prestado ' + data[0].numero_tinas + ' huacales ¿Desea continuar?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          denyButtonText: `No continuar`,
        }).then((result) => {

          if (result.isConfirmed) {
            this.showModal = true;

          } else if (result.isDenied) {
            this.ShowModal('Información', 'Proceso finalizado', 'info');
            this.showModal = false;
            window.location.reload();
            this.router.navigate(['/', 'dashboard/pedido/detpedido']);

          }
        })
      } else {
        this.showModal = true;
      }

    })





  }

  crearDespachoPrestamo(form: any) {
    this.despachosService.getById(this.idpedidoV).subscribe(
      (pedido: any) => {
        // console.log("asda")
        // console.log(pedido)
        // console.log(pedido[0].num_pollos)
        // console.log(pedido[0].cantidad_libras_p)

        let cantidadLibras = parseFloat(pedido[0].cantidad_libras_p)
        let numeroPollos = parseFloat(pedido[0].num_pollos)
        let totalLibras = numeroPollos * cantidadLibras;

        totalLibras = parseFloat(totalLibras.toFixed(2))

        // alert(totalLibras)
        let resultTinas: number;
        let tinasFInales;

        if (cantidadLibras < 3.7) {

          resultTinas = numeroPollos / 15;
          tinasFInales = Math.ceil(resultTinas);


          //15
        } else if (cantidadLibras > 3.7 && cantidadLibras < 5.4) {

          // 12
          resultTinas = numeroPollos / 12;
          tinasFInales = Math.ceil(resultTinas);


        } else if (cantidadLibras > 5.4) {

          // 10
          resultTinas = numeroPollos / 10;
          tinasFInales = Math.ceil(resultTinas);


        }

        this.formPedidoDetalleFinal.setValue({
          id_pedido: this.idpedidoV,
          fecha_actual: new Date,
          numero_tinas: tinasFInales,
          fecha_entrega: form.fecha_entrega,
          fk_tbl_guardia_cedula: form.fk_tbl_guardia_cedula,
          numero_acta: form.numero_acta,
          observacionesPrestamo: form.observacionesPrestamo,
        })

        this.despachosService.saveDespacho(this.formPedidoDetalleFinal.value).subscribe(data => {
          this.formBitacora.setValue({
            fecha_actual: new Date,
            movimiento: "Préstamo",
            accion: "Crear",
            cantidad: totalLibras,
            ayudante: form.fk_tbl_guardia_cedula,
            cliente: pedido[0].fk_tbl_cliente_cedula,
            observacion: form.observacionesPrestamo,
            numero_acta: form.numero_acta,
            usuario: this.userLo,
          })
          console.log(this.formBitacora.value)

          this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            // alert("hizo a")
          })

          this.formBitacora.setValue({
            fecha_actual: new Date,
            movimiento: "Despacho",
            accion: "Crear",
            cantidad: totalLibras,
            ayudante: form.fk_tbl_guardia_cedula,
            cliente: pedido[0].fk_tbl_cliente_cedula,
            observacion: pedido[0].observasiones,
            numero_acta: form.numero_acta,
            usuario: this.userLo,
          })

          this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
          })
          this.showModalMore('center', 'success', 'Despacho realizado exitosamente', false, 2000);
          this.showAllOrders();

        })



      },
      (error) => console.log(error)
    );

  }


  closeModal() {
    this.showModal = false;
  }
  showAllGuards() {
    this.guardiasService.getAllGuards().subscribe(
      (guardias: any) => {
        this.guardias = guardias

      },
      (error) => console.log(error)
    );
  }


}
