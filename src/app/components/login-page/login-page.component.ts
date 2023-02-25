import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../servicios/login/login.service';
import { TinasService } from '../../servicios/tinas/tinas.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  estado: boolean = false;
  resp: string = "";
  formLogin = new FormGroup({

    nombre_usuario: new FormControl(''),
    clave_usuario: new FormControl(''),

  });
  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router, private tinasServices: TinasService) { }

  ngOnInit(): void {

  }
  public Login(form: any) {
    this.estado = false;
    this.loginService.Login(form).subscribe((datau: any) => {

      if (datau.status == 'Error') {
        this.estado = true;
        this.resp = datau.resp;
      } else {
        this.estado = false;
        localStorage.setItem('tokenIC', datau.token)
        this.cookieService.set('tokenIC', datau.token, 4, '/');

        this.router.navigate(['/dashboard/homeA']);

        this.loginService.getnumPrestamos().subscribe((data: any) => {
          let numberPrestamos = parseInt(data[0].count)
          if (data[0].count > 0) {
            this.tinasServices.getAllTinas().subscribe((datas: any) => {

              if (datas[0].stock < 100) {
                if (numberPrestamos > 0 && numberPrestamos < 2) {
                  this.ShowModal('Información', 'Tiene ' + data[0].count + ' cliente que está retrasado en la entrega de los huacales. Además dispone menos de 100 huacales', 'info');

                } else if (numberPrestamos > 1) {
                  this.ShowModal('Información', 'Tiene ' + data[0].count + ' clientes que están retrasados en la entrega de los huacales. Además dispone menos de 100 huacales', 'info');

                }

              } else {
                if (numberPrestamos > 0 && numberPrestamos < 2) {
                  this.ShowModal('Información', 'Tiene ' + data[0].count + ' cliente que está retrasado en la entrega de los huacales', 'info');

                } else if (numberPrestamos > 1) {
                  this.ShowModal('Información', 'Tiene ' + data[0].count + ' clientes que están retrasados en la entrega de los huacales', 'info');

                }
              }



            })
          } else {
            this.showModalMore('center', 'success', 'Bienvenido ' + datau.usuario, false, 2000);
          }





        })
      }
    })

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