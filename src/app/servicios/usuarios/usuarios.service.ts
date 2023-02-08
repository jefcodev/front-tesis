import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = environment.base_url; 
  
  constructor(private http: HttpClient) { }

  getAllUsuarios(){
    let direccion=this.url+"usuarios";
    return this.http.get(direccion);
  }
  saveUsuarios(form:any){
    let direccion=this.url+"usuarios";
    return this.http.post(direccion,form);
  }
  updateUsuarios(form:any){
    let direccion=this.url+"usuarios";
    return this.http.put(direccion,form);
  }
}
