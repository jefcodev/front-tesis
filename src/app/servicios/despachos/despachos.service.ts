import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DespachosService {

  url: string = 'https://tinas-app.herokuapp.com/';
  //  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getAllDespachos() {
    let direccion = this.url + "despachos";
    return this.http.get(direccion);
  }
  saveDespacho(form: any) {
    let direccion = this.url + "despachos";
    return this.http.post(direccion, form);
  }
  updateDepachos(form: any) {
    let direccion = this.url + "despachos";
    return this.http.put(direccion, form);
  }
}
