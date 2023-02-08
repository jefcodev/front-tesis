import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  url = environment.base_url; 
  constructor(private http: HttpClient) { }

  getAllDevoluciones() {
    let direccion = this.url + "devoluciones";
    return this.http.get(direccion);
  }

  saveDevoluciones(form: any) {
    let direccion = this.url + "devoluciones";
    return this.http.post(direccion, form);
  }
  updateDevoluciones(form: any) {
    let direccion = this.url + "devoluciones";
    return this.http.put(direccion, form);
  }
}
