import { Component, OnInit } from '@angular/core';
import { ModelAutoridadesI } from 'src/app/modelos/modelo.autoridades';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoridadesService } from 'src/app/servicios/autoridades/autoridades.service';
import { min } from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autoridades',
  templateUrl: './autoridades.component.html',
  styleUrls: ['./autoridades.component.scss']
})
export class AutoridadesComponent implements OnInit {
  autoridades: ModelAutoridadesI[] = [];

  AutoridadForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),

  });
  nAutoridadForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),

  });

  constructor(private autoridadesServices: AutoridadesService) { }

  ngOnInit(): void {
    this.showAllAutoridades()
  }

  showAllAutoridades() {
    this.autoridadesServices.getAllAutoridades().subscribe(
      (autoridades: any) => {
        this.autoridades = autoridades
       
      },
      (error) => console.log(error)
    );
  }
  public crearAutoridades(form: any) {
    if (this.AutoridadForm.valid) {
      this.autoridadesServices.saveAutoridad(form).subscribe(data => {
        this.showAllAutoridades();
        // this.guardsForm();
        this.showModalMore('center', 'success', 'Autoridad registrado exitosamente', false, 2000);

      })
    } else {
      this.ShowModal('Autoridad', 'Error al registrar autoridad', 'error');
    }

  }
  public getDataAutoridades(id: any, nombre: any, apellido: any) {
    this.nAutoridadForm.patchValue({
      id: id,
      nombre: nombre,
      apellido: apellido

    })
  
  }

  public updateAutoridades(form: any) {
 
    if (this.nAutoridadForm.valid) {
      this.autoridadesServices.updateAutoridad(form).subscribe(data => {
        this.showAllAutoridades();
        this.showModalMore('center', 'success', 'Autoridad actualizado correctamente', false, 1500);
      })
    } else {
      this.ShowModal('Autoridad', 'Error al actualizar autoridad', 'error');
    }

  }
  ShowModal(title: any, infor: any, tipo: any) {
    Swal.fire(title, infor, tipo);
  }
  showModalMore(position: any, icon: any, title: any, showConfirmButton: any, timer: any) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }
  get id() { return this.AutoridadForm.get('id'); }
  get nombre() { return this.AutoridadForm.get('nombre'); }
  get apellido() { return this.AutoridadForm.get('apellido'); }

  get nombree() { return this.nAutoridadForm.get('nombre'); }
  get apellidoo() { return this.nAutoridadForm.get('apellido'); }
}
