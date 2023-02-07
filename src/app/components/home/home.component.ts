import { Component, OnInit } from '@angular/core';
import { PrestamoTinasService } from '../../servicios/prestamo_tinas/prestamo-tinas.service';
import { ModelPrestamosHomeI } from '../../modelos/modelo.prestamoshome';
import { TinasService } from '../../servicios/tinas/tinas.service';
import { ModelTinasBI } from '../../modelos/modelo.tinas';
import { CommonModule } from '@angular/common'

// import { Component, OnInit } from '@angular/core';
// import { ModelTinasBI } from 'src/app/modelos/modelo.tinas';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { TinasService } from 'src/app/servicios/tinas/tinas.service';
import { min } from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  prestamosHome: ModelPrestamosHomeI[] = [];
  tinas: ModelTinasBI[] = [];
  stock: number | undefined;

  constructor(private prestamosTinasServices: PrestamoTinasService, private tinasServices: TinasService) { }

  ngOnInit(): void {
    this.showAllPrestamosHome()
    this.showAllTinas()
  }

  showAllPrestamosHome() {
    this.prestamosTinasServices.getAllPrestamoss().subscribe(
      (prestamosHome: any) => {
        this.prestamosHome = prestamosHome
        console.log("prestamos: ",prestamosHome)

      },
      (error) => console.log(error)
    );
  }

  showAllTinas() {
    this.tinasServices.getAllTinas().subscribe(
      (tinas: any) => {
        this.tinas = tinas
        console.log("tinas:   ", tinas)
        console.log("asd: ", this.tinas[0]['stock'])
        this.stock = this.tinas[0]['stock'];

      },
      (error) => console.log(error)
    );
  }



  
}



