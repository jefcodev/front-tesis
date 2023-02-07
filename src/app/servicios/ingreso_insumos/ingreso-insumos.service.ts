import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IngresoInsumosService {

  url: string = 'https://tinas-app.herokuapp.com/';
  //  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllInsumos() {
    let direccion = this.url + "insumos";
    return this.http.get(direccion);
  }

  saveInsumos(form: any) {
    let direccion = this.url + "insumos";
    return this.http.post(direccion, form);
  }

  updateInsumos
    (form: any) {
    let direccion = this.url + "insumos";
    return this.http.put(direccion, form);
  }

}
