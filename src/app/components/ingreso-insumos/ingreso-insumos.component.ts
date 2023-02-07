import { Component, OnInit } from '@angular/core';
import { ModelInsumosI } from 'src/app/modelos/modelos.ingreso_insumos';
import { IngresoInsumosService } from 'src/app/servicios/ingreso_insumos/ingreso-insumos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuardiasService } from '../../servicios/guardias/guardias.service';
import { ModelGuardiasI } from '../../modelos/modelo.guardias';
import Swal from 'sweetalert2';
import { KardexService } from '../../servicios/kardex/kardex.service';

@Component({
  selector: 'app-ingreso-insumos',
  templateUrl: './ingreso-insumos.component.html',
  styleUrls: ['./ingreso-insumos.component.scss']
})
export class IngresoInsumosComponent implements OnInit {
  guardias: ModelGuardiasI[] = [];
  insumos: ModelInsumosI[] = [];
  fecha_ingreso: "2000-03-20" | undefined;
  fecha_salida: "2000-03-20" | undefined;

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

  get fecha_salid() { return this.formEditInsumo.get('fecha_salida'); }
  get cantidad_libras() { return this.formEditInsumo.get('cantidad_libras'); }
  get fk_tbl_guardia_cedula() { return this.formEditInsumo.get('fk_tbl_guardia_cedula'); }


  formEditInsumo = new FormGroup({
    id_insumos: new FormControl(''),
    fecha_ingreso: new FormControl(new Date),
    fecha_salida: new FormControl('', [Validators.required]),
    cantidad_libras: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required])
  })
  constructor(private guardiaService: GuardiasService, private insumosService: IngresoInsumosService, private dexServices: KardexService) { }

  ngOnInit(): void {
    this.showAllInsumos();
  }
  showAllInsumos() {
    this.insumosService.getAllInsumos().subscribe(
      (insumos: any) => {
        this.insumos = insumos
        console.log(this.insumos)
      },
      (error) => console.log(error)
    );
  }

  getDataInsumo(id_insumos: any, fecha_ingreso: any, fecha_salida:
    any, cantidad_libras: any, observasiones: any, fk_tbl_guardia_cedula: any) {
    this.formEditInsumo.setValue({
      id_insumos: id_insumos,
      fecha_ingreso: fecha_ingreso,
      fecha_salida: fecha_salida,
      cantidad_libras: cantidad_libras,
      observasiones: observasiones,
      fk_tbl_guardia_cedula: null
    })
    this.showAllGuards()

  }

  updateInsumos(form: any) {
    if (this.formEditInsumo.valid) {

      this.insumosService.updateInsumos(form).subscribe(data => {
        this.showAllInsumos();
        this.showModalMore('center', 'success', 'Insumo actualizado correctamente', false, 1500);

        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Insumos",
          accion: "Actualizar",
          cantidad: form.cantidad_libras,
          ayudante: form.fk_tbl_guardia_cedula,
          cliente: "",
          observacion: form.observasiones,
          numero_acta: "",
          usuario: "Admin",
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })

      })
    } else {
      this.ShowModal('Insumo', 'Error al actualizar', 'error');

    }

  }

  showAllGuards() {
    this.guardiaService.getAllGuards().subscribe(
      (guardias: any) => {
        this.guardias = guardias
        console.log(this.guardias)
      },
      (error) => console.log(error)
    );
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
