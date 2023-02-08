import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url = environment.base_url; 
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