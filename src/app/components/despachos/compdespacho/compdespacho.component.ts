import { Component, OnInit } from '@angular/core';
import { ModelDespachoI } from 'src/app/modelos/modelo.despachos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelClientesI } from 'src/app/modelos/modelo.clientes';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { GuardiasService } from 'src/app/servicios/guardias/guardias.service';
import { ModelGuardiasI } from 'src/app/modelos/modelo.guardias';
import { DespachosService } from 'src/app/servicios/despachos/despachos.service';
import { DespachosComponent } from '../despachos.component';
import Swal from 'sweetalert2';
import { KardexService } from '../../../servicios/kardex/kardex.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../../servicios/login/login.service';

@Component({
  selector: 'app-compdespacho',
  templateUrl: './compdespacho.component.html',
  styleUrls: ['./compdespacho.component.scss']
})
export class CompdespachoComponent implements OnInit {

  clientes: ModelClientesI[] = [];
  guardias: ModelGuardiasI[] = [];

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


  get cantidad_libras() { return this.formDespacho.get('cantidad_libras'); }
  get numero_tinas() { return this.formDespacho.get('numero_tinas'); }
  get ruta() { return this.formDespacho.get('ruta'); }
  get fk_tbl_cliente_cedula() { return this.formDespacho.get('fk_tbl_cliente_cedula'); }
  get fk_tbl_guardia_cedula() { return this.formDespacho.get('fk_tbl_guardia_cedula'); }


  formDespacho = new FormGroup({
    fecha_despacho: new FormControl(new Date),
    cantidad_libras: new FormControl('', [Validators.required]),
    numero_tinas: new FormControl('', [Validators.required]),
    ruta: new FormControl('', [Validators.required]),
    observasiones: new FormControl(''),
    fk_tbl_cliente_cedula: new FormControl('', [Validators.required]),
    fk_tbl_guardia_cedula: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService, private cookieService: CookieService, private clientesService: ClientesService,
    private guardiasservices: GuardiasService,
    private despachoServices: DespachosService,
    private router: Router,
    private despachoComponent: DespachosComponent, private dexServices: KardexService) { }

  ngOnInit(): void {
    this.showAllClients()
    this.showAllGuards();
    this.definirUser()
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

  showAllGuards() {
    this.guardiasservices.getAllGuards().subscribe(
      (guardias: any) => {
        this.guardias = guardias
        // this.showModalMore('center', 'success', 'Despacho registrado exitosamente', false, 2000);
      },
      (error) => console.log(error)
      // this.ShowModal('Pedido', 'Error al registrar pedido', 'error');

    );
  }

  createDespacho(form: any) {
    if (this.formDespacho.valid) {
      this.despachoServices.saveDespacho(form).subscribe(data => {
        this.router.navigateByUrl("/dashboard/despacho");
        this.showModalMore('center', 'success', 'Descapacho registrado exitosamente', false, 2000);

        this.despachoComponent.showAllDespachos();

        this.formBitacora.setValue({
          fecha_actual: new Date,
          movimiento: "Despacho",
          accion: "Crear",
          cantidad: form.cantidad_libras,
          ayudante: form.fk_tbl_guardia_cedula,
          cliente: form.fk_tbl_cliente_cedula,
          observacion: form.observasiones,
          numero_acta: "",
          usuario: this.userLo,
        })

        this.dexServices.saveBitacora(this.formBitacora.value).subscribe(data => {
        })
      })
    } else {
      this.ShowModal('Despacho', 'Error al registrar despacho', 'error');
      this.router.navigateByUrl("/dashboard/despacho");

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

  // get fecha_entrega() { return this.formPedido.get('fecha_entrega'); }

}
