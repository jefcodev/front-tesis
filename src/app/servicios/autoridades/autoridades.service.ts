import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AutoridadesService {
  url: string = 'https://tinas-app.herokuapp.com/';
  //  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getAllAutoridades() {
    let direccion = this.url + "autoridades";
    return this.http.get(direccion);
  }

  saveAutoridad(form: any) {
    let direccion = this.url + "autoridades";
    return this.http.post(direccion, form);
  }
  updateAutoridad(form: any) {
    let direccion = this.url + "autoridades";
    return this.http.put(direccion, form);
  }
  deleteAutoridad(id: any) {
    let direccion = this.url + `?id=` + id
    return this.http.delete(direccion)
  }
}
