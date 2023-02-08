import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IngresoInsumosService {

  url = environment.base_url; 

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
