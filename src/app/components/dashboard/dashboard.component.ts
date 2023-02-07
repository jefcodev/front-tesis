import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // url: string = 'http://localhost:3000/';
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  salir() {
    // let httpHeaders: HttpHeaders = new HttpHeaders();
    this.cookieService.set('tokenIC', '')
    // const token = this.cookieService.get('tokenIC');


    // httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token)

    // let direccion = this.url + "check";
    // this.http.get(direccion, {
    //   headers: httpHeaders,
    //   observe: 'response'
    // })
    //   .subscribe(ressult => {
    //     console.log(ressult)
    //     console.log(ressult.status)
    //     if (ressult.status == 200) {

    //     } else {
    window.location.reload();
    //       }
    //       // if(ressult.)


    //     })
  }


}
