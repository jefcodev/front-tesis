import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'https://tinas-app.herokuapp.com/';
  // url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  // getAllAutoridades() {
  //   let direccion = this.url + "autoridades";
  //   return this.http.get(direccion);
  // }

  Login(form: any) {
    let direccion = this.url + "login";
    return this.http.post(direccion, form);
  }
  getUser(token: any) {
    // alert(form)
    let direccion = this.url + "user/" + token;
    // alert(direccion)
    return this.http.post(direccion, null);
  }
  // updateAutoridad(form: any) {
  //   let direccion = this.url + "autoridades";
  //   return this.http.put(direccion, form);
  // }
}
