import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TinasService {
  url = environment.base_url; 
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