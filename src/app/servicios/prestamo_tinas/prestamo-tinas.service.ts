import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PrestamoTinasService {
  url: string = 'https://tinas-app.herokuapp.com/';
    // url: string = 'http://localhost:3000/'; 
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
    let direccion = this.url + "prestamoss";
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
