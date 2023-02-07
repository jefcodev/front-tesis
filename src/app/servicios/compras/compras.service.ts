import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url: string = 'https://tinas-app.herokuapp.com/';
  // url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getAllCompras() {
    let direccion = this.url + "compras";
    return this.http.get(direccion);
  }
  saveCompras(form: any) {
    let direccion = this.url + "compras";
    return this.http.post(direccion, form);
  }
  updateCompras(form: any) {
    let direccion = this.url + "compras";
    return this.http.put(direccion, form);
  }
}