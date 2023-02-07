import { Component, OnInit } from '@angular/core';
import { ModelClientesI } from 'src/app/modelos/modelo.clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes/clientes.service';
import { min } from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: ModelClientesI[] = [];
  telefonoPattern: any = /^[0-9]*$/;

  createFormGroup() {
    return new FormGroup({
      cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)])
    })
  }

  // nClienteForm = new FormGroup({

  // }
  // );
  cedulaAux: string = '';
  nClienteFormA = new FormGroup({
    cedula: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)])

  }
  );

  nClienteForm!: FormGroup;

  constructor(private clientesService: ClientesService) {
    this.nClienteForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.showAllClients();

  }
  showAllClients() {
    this.clientesService.getAllClients().subscribe(
      (clientes: any) => {
        this.clientes = clientes
        console.log(this.clientes)
      },
      (error) => console.log(error)
    );
  }
  public crearClient(form: any) {
    if (this.nClienteForm.valid) {
      console.log(form)
      this.clientesService.saveClient(form).subscribe(data => {
        this.showAllClients();

        this.cleanForm();
        this.showModalMore('center', 'success', 'Cliente registrado exitosamente', false, 2000);
        // this.ShowModal('Cliente','Clientre registrado existosamente!','success');
      })
      this.nClienteForm.reset;
    } else {
      this.ShowModal('Cliente', 'Error al registrar cliente', 'error');
      console.log(this.nClienteForm.valid)
    }

  }
  public updateClient(form: any) {
    console.log(this.nClienteFormA.valid)
    if (this.nClienteFormA.valid) {
      this.clientesService.updateClient(form).subscribe(data => {
        this.showModalMore('center', 'success', 'Cliente actualizado correctamente', false, 1500);
        this.showAllClients();
      })
    }else {
      this.ShowModal('Cliente', 'Error al actualizar cliente', 'error');
    }

  }
  public cleanForm() {
    this.nClienteForm.patchValue({
      cedula: '',
      nombre: '',
      apellido: '',
      ciudad: '',
      telefono: ''
    })


  }
  public getDataClient(cedula: any, nombre: any, apellido: any, ciudad: any, telefono: any) {
    this.nClienteFormA.patchValue({
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ciudad: ciudad,
      telefono: telefono
    })
    this.cedulaAux = cedula;
    console.log(cedula)

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


  get cedula() { return this.nClienteForm.get('cedula'); }
  get nombre() { return this.nClienteForm.get('nombre'); }
  get apellido() { return this.nClienteForm.get('apellido'); }
  get telefono() { return this.nClienteForm.get('telefono'); }
  get ciudad() { return this.nClienteForm.get('ciudad'); }

  get nombree() { return this.nClienteFormA.get('nombre'); }
  get apellidoo() { return this.nClienteFormA.get('apellido'); }
  get telefonoo() { return this.nClienteFormA.get('telefono'); }
  get ciudadd() { return this.nClienteFormA.get('ciudad'); }

}
