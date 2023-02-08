import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecicladasService {

  url = environment.base_url; 
  constructor(private http: HttpClient) { }

  getAllRecicladas() {
    let direccion = this.url + "recicladas";
    return this.http.get(direccion);
  }
  saveRecicladas(form: any) {
    let direccion = this.url + "recicladas";
    return this.http.post(direccion, form);
  }
  updateRecicladas
  (form: any) {
    let direccion = this.url + "recicladas";
    return this.http.put(direccion, form);
  }
}