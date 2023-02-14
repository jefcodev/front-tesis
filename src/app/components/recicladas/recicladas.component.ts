import { Component, OnInit, } from '@angular/core';
import { ModelRecicladasI } from '../../modelos/modelo.recicladas';
import { RecicladasService } from '../../servicios/recicladas/recicladas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelGuardiasI } from '../../modelos/modelo.guardias';
import { GuardiasService } from '../../servicios/guardias/guardias.service';
import { AutoridadesService } from '../../servicios/autoridades/autoridades.service';
import { ModelAutoridadesI } from '../../modelos/modelo.autoridades';
import Swal from 'sweetalert2';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../servicios/login/login.service';



@Component({
  selector: 'app-recicladas',
  templateUrl: './recicladas.component.html',
  styleUrls: ['./recicladas.component.scss']
})
export class RecicladasComponent implements OnInit {
  recicladas: ModelRecicladasI[] = [];
  autoridades: ModelAutoridadesI[] = [];
  fecha: "2000-03-20" | undefined;
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


  constructor(private loginService: LoginService, private cookieService: CookieService, private dexServices: KardexService, private autoridadesServices: AutoridadesService, private guardiasService: GuardiasService, private recicladasServices: RecicladasService) { }
  formRecicladas = new FormGroup({
    id: new FormControl(''),
    fecha: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required]),
    observacion: new FormControl(''),
    fk_tbl_autoridades_id: new FormControl('', [Validators.required])
  })



  guardias: ModelGuardiasI[] = [];


  ngOnInit(): void {
    this.showAllRecicladas()
    this.definirUser()
  }
  userLo: string = "";
  definirUser() {
    this.loginService.getUser(localStorage.getItem('tokenIC'))
      .subscribe((data: any) => {
        this.userLo = data.rol
      });
  }
  showAllRecicladas() {
    this.recicladasServices.getAllRecicladas().subscribe(
      (recicladas: any) => {
        this.recicladas = recicladas
        console.log(this.recicladas)
      },
      (error) => console.log(error)
    );
  }

  getDataReciclados(id: any, fecha: any, cantidad:
    any, numero_acta: any, observacion: any, guardia: any) {
    this.formRecicladas.setValue({
      id: id,
      fecha: fecha,
      cantidad: cantidad,
      numero_acta: numero_acta,
      observacion: observacion,
      fk_tbl_autoridades_id: null
    })
    console.log(this.formRecicladas)
    this.showAllAutoridades()

  }
  showAllAutoridades() {
    this.autoridadesServices.getAllAutoridades().subscribe(
      (autoridades: any) => {
        this.autoridades = autoridades
        // this.showModalMore('center', 'success', 'Despacho registrado exitosamente', false, 2000);
      },
      (error) => console.log(error)
      // this.ShowModal('Pedido', 'Error al registrar pedido', 'error');

    );
  }


  updateReciclados(form: any) {
    console.log(form)
    if (this.formRecicladas.valid) {
      this.recicladasServices.updateRecicladas(form).subscribe(data => {
        this.showModalMore('center', 'success', 'Reciclado actualizada correctamente', false, 1500);

        this.showAllRecicladas()
        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Recicladas",
          accion: "Actualizar",
          cantidad: form.cantidad,
          ayudante: form.fk_tbl_autoridades_id,
          cliente: "",
          observacion: form.observacion,
          numero_acta: form.numero_acta,
          usuario: this.userLo,
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })

      })
    } else {
      this.ShowModal('Reciclados', 'Error al actualizar', 'error');

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
  get fechau() { return this.formRecicladas.get('fecha'); }
  get numero_acta() { return this.formRecicladas.get('numero_acta'); }
  get cantidad() { return this.formRecicladas.get('cantidad'); }
  get fk_tbl_autoridades_id() { return this.formRecicladas.get('fk_tbl_autoridades_id'); }

}
