import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.base_url;
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

  getnumPrestamos() {
    let direccion = this.url + "getnumPrestamos";
    return this.http.get(direccion);
  }
  // updateAutoridad(form: any) {
  //   let direccion = this.url + "autoridades";
  //   return this.http.put(direccion, form);
  // }
}
