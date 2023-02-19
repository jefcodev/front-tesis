import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../servicios/login/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelLoginI } from 'src/app/modelos/modelo.login';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLogeado: string = "";
  login: ModelLoginI | undefined;
  // url: string = 'http://localhost:3000/';
  constructor(private cookieService: CookieService, private http: HttpClient, private loginService: LoginService) { }


  formgetUser = new FormGroup({
    token: new FormControl(this.cookieService.get('tokenIC'))
  });
  ngOnInit(): void {
    this.showUser();

  }
  salir() {
    localStorage.removeItem('tokenIC')
    window.location.reload();

  }
  public showUser() {

    this.loginService.getUser(localStorage.getItem('tokenIC')).subscribe((data: any) => {
      
      this.userLogeado = data.rol;
      // this.login=data;

    });


    // console.log(this.cookieService.get('tokenIC'))
  }


}
