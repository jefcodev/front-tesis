import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DespachosService {

  url = environment.base_url;
  constructor(private http: HttpClient) { }

  getAllDespachos() {
    let direccion = this.url + "despachos";
    return this.http.get(direccion);
  }
  getById(id_pedido: any) {
    let direccion = this.url + "getpedido/" + id_pedido;
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
