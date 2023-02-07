import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TinasService {

  url: string = 'https://tinas-app.herokuapp.com/';
  //  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getAllTinas() {
    let direccion = this.url + "tinas";
    return this.http.get(direccion);
  }
  saveTinas(form: any) {
    let direccion = this.url + "tinas";
    return this.http.post(direccion, form);
  }
  updateTinas(form: any) {
    let direccion = this.url + "tinas";
    return this.http.put(direccion, form);
  }
}