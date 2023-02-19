import { Component, OnInit } from '@angular/core';
import { ModelDevolucionesI } from '../../modelos/modelo.devoluciones';
import { DevolucionesService } from '../../servicios/devoluciones/devoluciones.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrestamoTinasComponent } from '../prestamo-tinas/prestamo-tinas.component';
import { PrestamoTinasService } from '../../servicios/prestamo_tinas/prestamo-tinas.service';
import { ModelTinasI } from '../../modelos/modelo.prestamo_tinas';
import Swal from 'sweetalert2';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../servicios/login/login.service';


@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss']
})
export class DevolucionesComponent implements OnInit {

  fecha: "" | undefined;

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
  formDevolucion = new FormGroup({
    cantidad: new FormControl('', [Validators.required]),
    fecha: new FormControl(new Date),
    observacion: new FormControl(''),
    fk_tbl_prestamo_tinas_id: new FormControl("", [Validators.required])

  });

  formDevolucionUpdate = new FormGroup({
    id: new FormControl(''),
    cantidad: new FormControl('', [Validators.required]),
    fecha: new FormControl(new Date),
    observacion: new FormControl(''),
    fk_tbl_prestamo_tinas_id: new FormControl("", [Validators.required])

  });
  prestamos: ModelTinasI[] = [];

  constructor(private loginService: LoginService, private cookieService: CookieService, private dexServices: KardexService, private devolucionesServices: DevolucionesService, private prestamoTinasServices: PrestamoTinasService) { }
  devoluciones: ModelDevolucionesI[] = [];
  ngOnInit(): void {
    this.showAllDevoluciones()
    this.showAllPrestamos()
    this.definirUser();
  }

  userLo: string = "";
  definirUser() {
    this.loginService.getUser(localStorage.getItem('tokenIC'))
      .subscribe((data: any) => {
        this.userLo = data.rol
      });
  }
  showAllDevoluciones() {
    this.devolucionesServices.getAllDevoluciones().subscribe(
      (devoluciones: any) => {
        this.devoluciones = devoluciones
      },
      (error) => console.log(error)
    );
  }

  showAllPrestamos() {
    this.prestamoTinasServices.getAllPrestamoss().subscribe(
      (prestamos: any) => {
        this.prestamos = prestamos
      },
      (error) => console.log(error)
    );
  }

  public crearDevolucion(form: any) {
    if (this.formDevolucion.valid) {
      this.devolucionesServices.saveDevoluciones(form).subscribe(data => {
        this.showAllDevoluciones();
        // this.guardsForm();
        this.showModalMore('center', 'success', 'Devolución registrado exitosamente', false, 2000);
        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Devolución",
          accion: "Crear",
          cantidad: form.cantidad,
          ayudante: "",
          cliente: form.fk_tbl_prestamo_tinas_id,
          observacion: form.observacion,
          numero_acta: "",
          usuario: this.userLo,
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Devolución', 'Error al registrar devolución', 'error');
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

  public getDataDevoluciones(id: any, cantidad: any, observacion: any, fecha: any, fk_tbl_prestamo_tinas_id: any) {
    this.formDevolucionUpdate.patchValue({
      id: id,
      cantidad: cantidad,
      observacion: observacion,
      fecha: fecha

    })

  }

  public updateAutoridades(form: any) {
    if (this.formDevolucionUpdate.valid) {
      this.devolucionesServices.updateDevoluciones(form).subscribe(data => {
        this.showAllDevoluciones();
        this.showModalMore('center', 'success', 'Devolución actualizada correctamente', false, 1500);
        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Devolución",
          accion: "Actualizar",
          cantidad: form.cantidad,
          ayudante: "",
          cliente: form.fk_tbl_prestamo_tinas_id,
          observacion: form.observacion,
          numero_acta: "",
          usuario: this.userLo,
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Devolución', 'Error al actualizar devolución', 'error');
    }

  }

  get cantidad() { return this.formDevolucion.get('cantidad'); }
  get fk_tbl_prestamo_tinas_id() { return this.formDevolucion.get('fk_tbl_prestamo_tinas_id'); }


  get cantidadUpdate() { return this.formDevolucionUpdate.get('cantidad'); }
  get fk_tbl_prestamo_tinas_idUpdate() { return this.formDevolucionUpdate.get('fk_tbl_prestamo_tinas_id'); }


}
