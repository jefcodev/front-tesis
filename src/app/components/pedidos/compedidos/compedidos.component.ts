import { Component, OnInit, Input } from '@angular/core';
import { ModelClientesI } from 'src/app/modelos/modelo.clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { PedidosService } from '../../../servicios/pedidos/pedidos.service';
import { Router } from '@angular/router';
import { PedidosComponent } from '../pedidos/pedidos.component';
import Swal from 'sweetalert2';

import { KardexService } from '../../../servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../../servicios/login/login.service';
// import { NgbModa } from '@ng-bootstrap/ng-bootstrap'
import { GuardiasService } from '../../../servicios/guardias/guardias.service';
import { ModelGuardiasI } from 'src/app/modelos/modelo.guardias';
import { TinasService } from '../../../servicios/tinas/tinas.service';

@Component({
  selector: 'app-compedidos',
  templateUrl: './compedidos.component.html',
  styleUrls: ['./compedidos.component.scss']
})
export class CompedidosComponent implements OnInit {


  showModal = false;
  guardias: ModelGuardiasI[] = [];
  clientes: ModelClientesI[] = [];

  closeModal() {
    this.showModal = false;
  }

  fecha_pedidoV: string = "";
  cantidad_librasV: string = "";
  rutaV: string = "";
  fk_tbl_cliente_cedulaV: string = "";
  accionV: string = "";
  cantidadPollosV: string = "";
  observacionesV: string = "";


  accion: string = "";


  formBitacora = new FormGroup({
    fecha_actual: new FormControl(''),
    movimiento: new FormControl(''),
    accion: new FormControl(''),
    cantidad: new FormControl(''),
    ayudante: new FormControl(''),
    cliente: new FormControl(''),
    observacion: new FormControl(''),
    numero_acta: new FormControl(''),
    usuario: new FormControl(''),
    numero_tinas: new FormControl(''),
  });


  constructor(private guardiasService: GuardiasService,
    private loginService: LoginService,
    private cookieService: CookieService,
    private clientesService: ClientesService,
    private pedidosService: PedidosService,
    private router: Router,
    private servicesTinas: TinasService,
    private pedidosComponent: PedidosComponent,
    private dexServices: KardexService) { }

  formPedido = new FormGroup({
    fecha_pedido: new FormControl(new Date),
    fecha_entrega: new FormControl(new Date),
    cantidad_libras: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required]),
    accion: new FormControl('', [Validators.required]),
    numero_pollos: new FormControl('', [Validators.required]),


  })

  formPedidoFinal = new FormGroup({
    fecha_pedido: new FormControl(new Date),
    fecha_entrega: new FormControl(''),
    cantidad_libras: new FormControl(''),
    ruta: new FormControl(''),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl(''),
    accion: new FormControl(''),
    fk_tbl_guardia_cedula: new FormControl(''),
    numero_acta: new FormControl(''),
    observacionesPrestamo: new FormControl(''),
    numero_tinas: new FormControl('')
  })

  formPedidoDetalle = new FormGroup({
    fecha_entrega: new FormControl(''),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required]),
    observacionesPrestamo: new FormControl('', [Validators.required])
  })



  formPedidoResult = new FormGroup({
    fecha_pedido: new FormControl(new Date),
    fecha_entrega: new FormControl(new Date),
    cantidad_libras: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required]),
    accion: new FormControl('', [Validators.required]),
    numero_pollos: new FormControl('', [Validators.required]),
    cantidad_libras_p: new FormControl('', [Validators.required]),
  })


  ngOnInit(): void {
    this.showAllClients();
    this.definirUser();
  }
  userLo: string = ""; definirUser() {
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
  //Método para crear le pedido-despacho
  crearDespachoPedido(form: any) {

    if (this.formPedidoDetalle.valid) {
      let cantidadLibras = parseFloat(this.cantidad_librasV)
      let numeroPollos = parseFloat(this.cantidadPollosV)
      let totalLibras = numeroPollos * cantidadLibras;
      totalLibras = parseFloat(totalLibras.toFixed(2))
      let resultTinas: number;
      let tinasFInales = 0;
      if (cantidadLibras < 3.7) {
        resultTinas = numeroPollos / 15;
        tinasFInales = Math.ceil(resultTinas);
      } else if (cantidadLibras > 3.7 && cantidadLibras < 5.4) {
        resultTinas = numeroPollos / 12;
        tinasFInales = Math.ceil(resultTinas);
      } else if (cantidadLibras > 5.4) {
        resultTinas = numeroPollos / 10;
        tinasFInales = Math.ceil(resultTinas);
      }
      this.formPedidoFinal.setValue({
        fecha_pedido: this.fecha_pedidoV,
        fecha_entrega: form.fecha_entrega,
        cantidad_libras: totalLibras,
        ruta: this.rutaV,
        observasiones: this.observacionesV,
        fk_tbl_cliente_cedula: this.fk_tbl_cliente_cedulaV,
        accion: this.accionV,
        fk_tbl_guardia_cedula: form.fk_tbl_guardia_cedula,
        numero_acta: form.numero_acta,
        observacionesPrestamo: form.observacionesPrestamo,
        numero_tinas: tinasFInales
      })

      this.servicesTinas.getAllTinas().subscribe((data: any) => {
        if (data[0].stock>tinasFInales) {
          this.pedidosService.saveOrders(this.formPedidoFinal.value).subscribe(data => {
        
            //Inserta en el kardex (Pedido-Crear)
            this.pedidosComponent.showAllOrders();
            this.formBitacora.setValue({
              fecha_actual: new Date,
              movimiento: "Pedido",
              accion: "Crear",
              cantidad: totalLibras,
              ayudante: form.fk_tbl_guardia_cedula,
              cliente: this.fk_tbl_cliente_cedulaV,
              observacion: form.observacionesPrestamo,
              numero_acta: form.numero_acta,
              usuario: this.userLo,
              numero_tinas: tinasFInales
            })
            this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            })
            //Inserta en el kardex (Despacho-Préstamo)
            this.formBitacora.setValue({
              fecha_actual: new Date,
              movimiento: "Préstamo",
              accion: "Crear",
              cantidad: totalLibras,
              ayudante: form.fk_tbl_guardia_cedula,
              cliente: this.fk_tbl_cliente_cedulaV,
              observacion: form.observacionesPrestamo,
              numero_acta: form.numero_acta,
              usuario: this.userLo,
              numero_tinas: tinasFInales
            })

            this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            })
            //Inserta en el kardex (Despacho-Crear)
            this.formBitacora.setValue({
              fecha_actual: new Date,
              movimiento: "Despacho",
              accion: "Crear",
              cantidad: totalLibras,
              ayudante: form.fk_tbl_guardia_cedula,
              cliente: this.fk_tbl_cliente_cedulaV,
              observacion: this.observacionesV,
              numero_acta: form.numero_acta,
              usuario: this.userLo,
              numero_tinas: tinasFInales
            })
            this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            })
            this.showModal = false;
            this.router.navigateByUrl("/dashboard/prestamo");
            this.showModalMore('center', 'success', 'Detalle registrado exitosamente', false, 2000);
          })

        } else {
         
          this.formPedidoFinal.setValue({
            fecha_pedido: this.fecha_pedidoV,
            fecha_entrega: form.fecha_entrega,
            cantidad_libras: totalLibras,
            ruta: this.rutaV,
            observasiones: this.observacionesV,
            fk_tbl_cliente_cedula: this.fk_tbl_cliente_cedulaV,
            accion: "pendiente",
            fk_tbl_guardia_cedula: form.fk_tbl_guardia_cedula,
            numero_acta: form.numero_acta,
            observacionesPrestamo: form.observacionesPrestamo,
            numero_tinas: tinasFInales
          })
          this.pedidosService.saveOrders(this.formPedidoFinal.value).subscribe(data => {
            
          // this.showModalMore('center', 'info', 'El número huacales es insuficiente para realizar el despacho. Agregado a pendientes', false, 4000);
            
         
            //Inserta en el kardex (Pedido-Crear)
            // console.log("asda ad  ad ad d das das ")
            // this.pedidosComponent.showAllOrders();
            this.formBitacora.setValue({
              fecha_actual: new Date,
              movimiento: "Pedido pendiente",
              accion: "Crear",
              cantidad: totalLibras,
              ayudante: form.fk_tbl_guardia_cedula,
              cliente: this.fk_tbl_cliente_cedulaV,
              observacion: form.observacionesPrestamo,
              numero_acta: form.numero_acta,
              usuario: this.userLo,
              numero_tinas: tinasFInales
            })
            this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            })

            this.formBitacora.setValue({
              fecha_actual: new Date,
              movimiento: "Despacho",
              accion: "Crear",
              cantidad: totalLibras,
              ayudante: form.fk_tbl_guardia_cedula,
              cliente: this.fk_tbl_cliente_cedulaV,
              observacion: form.observacionesPrestamo,
              numero_acta: form.numero_acta,
              usuario: this.userLo,
              numero_tinas: tinasFInales
            })
            this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
            })
            this.showModal = false;
            Swal.fire({
              title: 'El número de huacales es insuficiente para realizar el despacho. Agregado a pendientes ',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            this.router.navigateByUrl("/dashboard/pedido/pendiente");
          })
         
        }

      })




    } else {
      this.ShowModal('Pedido', 'Algún campo se encuentra vacío', 'error');

    }

  }
  //metodo para crear solo el pedido
  createPedido(form: any) {
    let numeroPollos = parseFloat(form.cantidad_libras)
    let cantidadLibras = parseFloat(form.numero_pollos)


    if (form.accion == 'true') {
      if (this.formPedido.valid) {

        this.pedidosService.getnumTinas(form.fk_tbl_cliente_cedula).subscribe((data: any) => {
          let numtinas = parseInt(data[0].numero_tinas);
          if (numtinas > 0) {
            Swal.fire({
              title: 'El cliente seleccionado tiene prestado ' + data[0].numero_tinas + ' huacales ¿Desea continuar?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Continuar',
              denyButtonText: `No continuar`,
            }).then((result) => {

              if (result.isConfirmed) {
                this.showModal = true;
                this.showAllGuards();
                this.fecha_pedidoV = form.fecha_pedido;
                this.cantidad_librasV = form.cantidad_libras
                this.rutaV = form.ruta
                this.fk_tbl_cliente_cedulaV = form.fk_tbl_cliente_cedula
                this.accionV = form.accion
                this.cantidadPollosV = form.numero_pollos

                this.observacionesV = form.observasiones
              } else if (result.isDenied) {
                this.ShowModal('Información', 'Proceso finalizado', 'info');
              }
            })

          } else {
            this.showModal = true;
            this.showAllGuards();
            this.fecha_pedidoV = form.fecha_pedido;
            this.cantidad_librasV = form.cantidad_libras
            this.rutaV = form.ruta
            this.fk_tbl_cliente_cedulaV = form.fk_tbl_cliente_cedula
            this.accionV = form.accion
            this.cantidadPollosV = form.numero_pollos

            this.observacionesV = form.observasiones
          }






        })


      } else {
        this.ShowModal('Pedido', 'Algún campo se encuentra vacío', 'error');
      }

    } else {
      if (this.formPedido.valid) {


        let resultado = numeroPollos * cantidadLibras;

        resultado = parseFloat(resultado.toFixed(2))


        this.formPedidoResult.setValue({
          fecha_pedido: form.fecha_pedido,
          fecha_entrega: form.fecha_entrega,
          cantidad_libras: resultado,
          ruta: form.ruta,
          observasiones: form.observasiones,
          fk_tbl_cliente_cedula: form.fk_tbl_cliente_cedula,
          accion: form.accion,
          numero_pollos: form.numero_pollos,
          cantidad_libras_p: form.cantidad_libras

        })



        this.pedidosService.saveOrders(this.formPedidoResult.value).subscribe(data => {
          this.router.navigateByUrl("/dashboard/pedido/detpedido");
          this.pedidosComponent.showAllOrders();
          this.showModalMore('center', 'success', 'Pedido registrado exitosamente', false, 2000);

          this.formBitacora.setValue({
            fecha_actual: new Date,
            movimiento: "Pedido",
            accion: "Crear",
            cantidad: resultado,
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
        this.ShowModal('Pedido', 'Algún campo se encuentra vacío', 'error');
      }
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

  get fecha_entrega() { return this.formPedido.get('fecha_entrega'); }
  get fk_tbl_cliente_cedula() { return this.formPedido.get('fk_tbl_cliente_cedula'); }
  get cantidad_libras() { return this.formPedido.get('cantidad_libras'); }
  get ruta() { return this.formPedido.get('ruta'); }
  get observasiones() { return this.formPedido.get('observasiones'); }
  get numero_pollos() { return this.formPedido.get('numero_pollos'); }
  get accionn() { return this.formPedido.get('accion'); }


  showAllGuards() {
    this.guardiasService.getAllGuards().subscribe(
      (guardias: any) => {
        this.guardias = guardias

      },
      (error) => console.log(error)
    );
  }
}


