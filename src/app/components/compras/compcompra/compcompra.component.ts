import { Component, OnInit } from '@angular/core';
import { AutoridadesService } from '../../../servicios/autoridades/autoridades.service';
import { ModelAutoridadesI } from '../../../modelos/modelo.autoridades';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../servicios/compras/compras.service';
import { Router } from '@angular/router';
import { ComprasComponent } from '../compras.component';
import { KardexService } from '../../../servicios/kardex/kardex.service';
import { LoginService } from '../../../servicios/login/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-compcompra',
  templateUrl: './compcompra.component.html',
  styleUrls: ['./compcompra.component.scss']
})
export class CompcompraComponent implements OnInit {
  userLo: string = "";
  autoridades: ModelAutoridadesI[] = [];


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

  formCompra = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    numero_acta: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    cantidad: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    observacion: new FormControl(''),
    fk_tbl_autoridades_id: new FormControl('', [Validators.required]),


  });

  constructor(private loginService: LoginService, private cookieService: CookieService, private autoridadesServices: AutoridadesService, private comprasServices: ComprasService,
    private router: Router, private comprasComponent: ComprasComponent, private dexServices: KardexService) { }

  ngOnInit(): void {
    this.showAllAutoridades();
    this.definirUser()
  }

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

  createCompra(form: any) {
    if (this.formCompra.valid) {
      this.comprasServices.saveCompras(form).subscribe(data => {
        this.router.navigateByUrl("/dashboard/compras");
        this.showModalMore('center', 'success', 'Compra registrado exitosamente', false, 2000);
        this.comprasComponent.showAllCompras();

        // this.loginService.getUser(this.cookieService.get('tokenIC'))
        //   .subscribe((data: any) => {

        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Compra",
          accion: "Crear",
          cantidad: form.cantidad,
          ayudante: form.fk_tbl_autoridades_id,
          cliente: "",
          observacion: form.observacion,
          numero_acta: form.numero_acta,
          usuario: this.userLo
        })



        // });
        // console.log(this.formBitacora)

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })


      })



    } else {
      this.ShowModal('Compra', 'Error al registrar compra', 'error');
      this.router.navigateByUrl("/dashboard/compras");
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


  get fecha() { return this.formCompra.get('fecha'); }
  get numero_acta() { return this.formCompra.get('numero_acta'); }
  get cantidad() { return this.formCompra.get('cantidad'); }
  // get observacion() { return this.formCompra.get('observacion'); }
  get fk_tbl_autoridades_id() { return this.formCompra.get('fk_tbl_autoridades_id'); }



}
