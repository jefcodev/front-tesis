import { Component, OnInit } from '@angular/core';
import { ModelClientesI } from 'src/app/modelos/modelo.clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { PedidosService } from '../../../servicios/pedidos/pedidos.service';
import { Router } from '@angular/router';
import { PedidosComponent } from '../pedidos/pedidos.component';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { KardexService } from '../../../servicios/kardex/kardex.service';

@Component({
  selector: 'app-compedidos',
  templateUrl: './compedidos.component.html',
  styleUrls: ['./compedidos.component.scss']
})
export class CompedidosComponent implements OnInit {


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
  constructor(private clientesService: ClientesService, private pedidosService: PedidosService, private router: Router,
    private pedidosComponent: PedidosComponent, private dexServices: KardexService) { }

  formPedido = new FormGroup({
    fecha_pedido: new FormControl(new Date),
    fecha_entrega: new FormControl('', [Validators.required]),
    cantidad_libras: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    this.showAllClients();
  }
  showAllClients() {
    this.clientesService.getAllClients().subscribe(
      (clientes: any) => {
        this.clientes = clientes

      },
      (error) => console.log(error)
    );
  }

  createPedido(form: any) {
    if (this.formPedido.valid) {
      this.pedidosService.saveOrders(form).subscribe(data => {
        this.router.navigateByUrl("/dashboard/pedido");
        this.pedidosComponent.showAllOrders();
        this.showModalMore('center', 'success', 'Pedido registrado exitosamente', false, 2000);

        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Pedido",
          accion: "Crear",
          cantidad: form.cantidad_libras,
          ayudante: "",
          cliente: form.fk_tbl_cliente_cedula,
          observacion: form.observasiones,
          numero_acta: "",
          usuario: "Admin",
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Pedido', 'Error al registrar pedido', 'error');
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
}
