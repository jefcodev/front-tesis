import { Component, OnInit } from '@angular/core';
import { ModelDespachoI } from 'src/app/modelos/modelo.despachos';
import { DespachosService } from 'src/app/servicios/despachos/despachos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelClientesI } from '../../modelos/modelo.clientes';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { ModelGuardiasI } from '../../modelos/modelo.guardias';
import { GuardiasService } from 'src/app/servicios/guardias/guardias.service';
import Swal from 'sweetalert2';
import { KardexService } from '../../servicios/kardex/kardex.service';


@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.scss']
})
export class DespachosComponent implements OnInit {

  despachos: ModelDespachoI[] = [];
  clientes: ModelClientesI[] = [];
  guardias: ModelGuardiasI[] = [];

  get cantidad_libras() { return this.formDespacho.get('cantidad_libras'); }
  get numero_tinas() { return this.formDespacho.get('numero_tinas'); }
  get ruta() { return this.formDespacho.get('ruta'); }
  get fk_tbl_cliente_cedula() { return this.formDespacho.get('fk_tbl_cliente_cedula'); }
  get fk_tbl_guardia_cedula() { return this.formDespacho.get('fk_tbl_guardia_cedula'); }


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


  formDespacho = new FormGroup({
    id_despacho: new FormControl(''),
    fecha_despacho: new FormControl(new Date),
    cantidad_libras: new FormControl('', [Validators.required]),
    numero_tinas: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required]),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required])
  });

  constructor(private despachoServicio: DespachosService,
    private clientesService: ClientesService,
    private guardiasService: GuardiasService,
    private despachoServices: DespachosService, private dexServices: KardexService) { }

  ngOnInit(): void {
    this.showAllDespachos();
  }

  getDataDespachos(id_despacho: any, fecha_despacho: any, cantidad_libras:
    any, numero_tinas: any, ruta: any, observaciones: any, cliente: any, guardia: any) {
    this.formDespacho.patchValue({
      id_despacho: id_despacho,
      fecha_despacho: new Date,
      cantidad_libras: cantidad_libras,
      numero_tinas: numero_tinas,
      ruta: ruta,
      observasiones: observaciones,
      fk_tbl_cliente_cedula: null,
      fk_tbl_guardia_cedula: null
    })
    console.log("Imprimiendo ", this.formDespacho)

    this.showAllClients();
    this.showAllGuards();
  }

  showAllDespachos() {
    this.despachoServicio.getAllDespachos().subscribe(
      (despachos: any) => {
        this.despachos = despachos
        console.log(this.despachos)
      },
      (error) => console.log(error)
    );
  }

  showAllClients() {
    this.clientesService.getAllClients().subscribe(
      (clientes: any) => {
        this.clientes = clientes

      },
      (error) => console.log(error)
    );
  }
  showAllGuards() {
    this.guardiasService.getAllGuards().subscribe(
      (guardias: any) => {
        this.guardias = guardias

      },
      (error) => console.log(error)
    );
  }

  updateDespacho(form: any) {
    if (this.formDespacho.valid) {
      this.despachoServices.updateDepachos(form).subscribe(data => {
        this.showModalMore('center', 'success', 'Despacho actualizada correctamente', false, 1500);

        this.showAllDespachos()
        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Despacho",
          accion: "Actualizar",
          cantidad: form.cantidad_libras,
          ayudante: form.fk_tbl_guardia_cedula,
          cliente: form.fk_tbl_cliente_cedula,
          observacion: form.observasiones,
          numero_acta: "",
          usuario: "Admin",
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Despacho', 'Error al actualizar despacho', 'error');

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
}
