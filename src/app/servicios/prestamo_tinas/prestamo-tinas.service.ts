import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PrestamoTinasService {
  url = environment.base_url; 
  constructor(private http: HttpClient) { }


  getAllPrestamos() {
    let direccion = this.url + "prestamos";
    return this.http.get(direccion);
  }
  getCountPrestamo() {
    let direccion = this.url + "prestamosCount";
    return this.http.get(direccion);
  }
  getAllPrestamoss() {
    let direccion = this.url + "prestamosss";
    return this.http.get(direccion);
  }

  savePrestamos(form: any) {
    let direccion = this.url + "prestamos";
    return this.http.post(direccion, form);
  }
  updatePrestamos(form: any) {
    let direccion = this.url + "prestamos";
    return this.http.put(direccion, form);
  }
}
