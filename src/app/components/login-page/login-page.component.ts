import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../servicios/login/login.service';

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
  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

  }
  public Login(form: any) {
    this.estado = false;
    this.loginService.Login(form).subscribe((data: any) => {

      if (data.status == 'Error') {
        this.estado = true;
        this.resp = data.resp;
      } else {
        this.estado = false;
        this.cookieService.set('tokenIC', data.token, 4, '/');
        this.showModalMore('center', 'success', 'Bienvenido '+data.usuario, false, 2000);
        this.router.navigate(['/dashboard/homeA']);
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