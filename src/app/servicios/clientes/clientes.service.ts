import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url: string = 'https://tinas-app.herokuapp.com/';
  // url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getAllClients() {
    let direccion = this.url + "clientes";
    return this.http.get(direccion);
  }
  getCountClients() {
    let direccion = this.url + "clientesCount";
    return this.http.get(direccion);
  }

  saveClient(form: any) {
    let direccion = this.url + "clientes";
    return this.http.post(direccion, form);
  }
  updateClient(form: any) {
    let direccion = this.url + "clientes";
    return this.http.put(direccion, form);
  }
}
