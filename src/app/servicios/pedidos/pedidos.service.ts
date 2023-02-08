import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url = environment.base_url; 
  constructor(private http: HttpClient) { }

  getAllOrders() {
    let direccion = this.url + "pedidos";
    return this.http.get(direccion);
  }
  getCountOrders() {
    let direccion = this.url + "pedidosCount";
    return this.http.get(direccion);
  }

  saveOrders(form: any) {
    let direccion = this.url + "pedidos";
    return this.http.post(direccion, form);
  }

  updateOrders(form: any) {
    let direccion = this.url + "pedidos";
    return this.http.put(direccion, form);
  }
}
