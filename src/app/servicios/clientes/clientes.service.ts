import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = environment.base_url; 
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
