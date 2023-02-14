import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModelComprasI } from 'src/app/modelos/modelo.compras';
import { ComprasService } from 'src/app/servicios/compras/compras.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelAutoridadesI } from '../../modelos/modelo.autoridades';
import { AutoridadesService } from '../../servicios/autoridades/autoridades.service';
import Swal from 'sweetalert2';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras: ModelComprasI[] = [];
  autoridades: ModelAutoridadesI[] = [];

  constructor(private loginService: LoginService, private cookieService: CookieService, private cd: ChangeDetectorRef, private comprasServices: ComprasService, private autoridadesServices: AutoridadesService, private dexServices: KardexService) { }
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
  formEditCompras = new FormGroup({
    id_compras: new FormControl(''),
    fecha: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    observacion: new FormControl(''),
    fk_tbl_autoridades_id: new FormControl('', [Validators.required]),

  });
  fe!: Date;

  fechasx: Date = new Date;
  public f: Date = new Date;




  ngOnInit(): void {
    this.showAllCompras()
    this.definirUser();

  }
  userLo: string = "";
  definirUser() {
    this.loginService.getUser(this.cookieService.get('tokenIC'))
      .subscribe((data: any) => {
        this.userLo = data.rol
      });
  }
  showAllAutoridades() {
    this.autoridadesServices.getAllAutoridades().subscribe(
      (autoridades: any) => {
        this.autoridades = autoridades
        console.log(this.autoridades)
      },
      (error) => console.log(error)
    );
  }
  showAllCompras() {
    this.comprasServices.getAllCompras().subscribe(
      (compras: any) => {
        this.compras = compras
        console.log(this.compras)
      },
      (error) => console.log(error)
    );
  }


  getDataCompras(id_compras: any, fecha: any, numero_acta:
    any, cantidad: any, observacion: any, autoridad: any) {


    this.formEditCompras.patchValue({

      id_compras: id_compras,
      fecha: new Date,
      numero_acta: numero_acta,
      cantidad: cantidad,
      observacion: observacion

    })
    // setTimeout(() => {
    //   this.fe = fecha;
    // }, 0);
    Promise.resolve().then(() => {
      this.fe = fecha;
    })
    this.cd.detectChanges();

    console.log("Imprimiendo ", this.formEditCompras.value)

    this.showAllAutoridades();
  }

  updateCompras(form: any) {
    if (this.formEditCompras.valid) {
      this.comprasServices.updateCompras(form).subscribe(data => {
        this.showModalMore('center', 'success', 'Compra actualizada correctamente', false, 1500);
        this.showAllCompras()


        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Compra",
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
      this.ShowModal('Compra', 'Error al actualizar compra', 'error');
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

  get fechas() { return this.formEditCompras.get('fecha'); }
  get numero_actaa() { return this.formEditCompras.get('numero_acta'); }
  get cantidadd() { return this.formEditCompras.get('cantidad'); }
  // get observacion() { return this.formCompra.get('observacion'); }
  get fk_tbl_autoridades_idd() { return this.formEditCompras.get('fk_tbl_autoridades_id'); }


}
