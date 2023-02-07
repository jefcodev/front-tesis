import { Component, OnInit } from '@angular/core';
import { ModelTinasBI } from 'src/app/modelos/modelo.tinas';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TinasService } from 'src/app/servicios/tinas/tinas.service';
import { min } from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tinas',
  templateUrl: './tinas.component.html',
  styleUrls: ['./tinas.component.scss']
})
export class TinasComponent implements OnInit {
  tinas:ModelTinasBI[] = [];
  constructor(private tinasServices: TinasService) { }

  ngOnInit(): void {
    this.showAllTinas()
  }
  showAllTinas() {
    this.tinasServices.getAllTinas().subscribe(
      (tinas: any) => {
        this.tinas = tinas
        console.log(this.tinas)
      },
      (error) => console.log(error)
    );
  }
}
