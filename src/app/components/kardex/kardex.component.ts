import { Component, OnInit } from '@angular/core';
import { ModelKardexI } from '../../modelos/modelo.kardex';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit {
  kardex: ModelKardexI[] = [];

  formbusqueda = new FormGroup({
    busqueda: new FormControl(''),

  });
  constructor(private dexServices: KardexService) { }
  public src: string | undefined;

  ngOnInit(): void {
    this.showAllkadex();
  }

  showAllkadex() {
    this.dexServices.getAllBitacora().subscribe(
      (kardex: any) => {
        this.kardex = kardex

      },
      (error) => console.log(error)
    );
  }

  search(value: any) {
    console.log(value)
    this.formbusqueda.setValue({
      busqueda: value
    })

    this.dexServices.saveBitacoraBy(this.formbusqueda).subscribe(
      (kardex: any) => {
        this.kardex = kardex
        console.log(kardex)
      },
      (error) => console.log(error)
    );
  }
}
