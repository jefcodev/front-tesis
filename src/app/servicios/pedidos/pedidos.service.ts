import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url: string = 'https://tinas-app.herokuapp.com/';
    // url: string = 'http://localhost:3000/';
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
