import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KardexService {

  url = environment.base_url; 
  constructor(private http: HttpClient) { }

  getAllBitacora() {
    let direccion = this.url + "bitacora";
    return this.http.get(direccion);
  }

  saveBitacora(form: any) {
    // console.log(form)
    // console.log("haciendo ")
    let direccion = this.url + "bitacora";
    return this.http.post(direccion, form);
  }
  saveBitacoraBy(form: any) {
    // console.log(form)
    // console.log("haciendo ")
    let direccion = this.url + "bit";
    return this.http.post(direccion, form);
  }


}
