import { Component, OnInit } from '@angular/core';
import { ModelUsuarioI } from '../../modelos/modelo.usuarios';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: ModelUsuarioI[] = [];
  public cities: { name: string }[] = [];

  get tipo_usuario() { return this.formUsuarios.get('tipo_usuario'); }
  get nombre_usuario() { return this.formUsuarios.get('nombre_usuario'); }
  get clave_usuario() { return this.formUsuarios.get('clave_usuario'); }
  get tipo_usuarioo() { return this.formUpdateUsuarios.get('tipo_usuario'); }
  get nombre_usuarioo() { return this.formUpdateUsuarios.get('nombre_usuario'); }
  get clave_usuarioo() { return this.formUpdateUsuarios.get('clave_usuario'); }



  formUsuarios = new FormGroup({
    tipo_usuario: new FormControl('', [Validators.required]),
    nombre_usuario: new FormControl('', [Validators.required]),
    clave_usuario: new FormControl('', [Validators.required]),

  });

  formUpdateUsuarios = new FormGroup({
    id_usuario: new FormControl('', [Validators.required]),
    tipo_usuario: new FormControl('', [Validators.required]),
    nombre_usuario: new FormControl('', [Validators.required]),
    clave_usuario: new FormControl('', [Validators.required]),

  });
  constructor(private userService: UsuariosService) { }



  ngOnInit(): void {
    this.showAllUsuarios()
    this.cities = [{ name: 'Administrador' }, { name: 'Gerente' },];

  }

  showAllUsuarios() {
    this.userService.getAllUsuarios().subscribe(
      (usuarios: any) => {
        this.usuarios = usuarios
        console.log(this.usuarios)
      },
      (error) => console.log(error)
    );
  }

  public getDataUsuarios(id_usuario: any, tipo_usuario: any, nombre_usuario: any) {
    // alert(id_usaurio + nombre_usuario +  tipo_usuario);
    this.formUpdateUsuarios.reset();
    this.formUpdateUsuarios.patchValue({
      id_usuario: id_usuario,
      tipo_usuario: tipo_usuario,
      nombre_usuario: nombre_usuario,
      clave_usuario: "",

    })

  }

  public crearUsuario(form: any) {
    if (this.formUsuarios.valid) {
      this.userService.saveUsuarios(form).subscribe(data => {
        this.showAllUsuarios();
        // this.guardsForm();
        this.showModalMore('center', 'success', 'Usuario registrado exitosamente', false, 2000);


      })
    } else {
      this.ShowModal('Usuario', 'Error al registrar usuario', 'error');
    }

  }

  Resetform() {
    this.formUsuarios.reset();
  }

  public updateUsuarios(form: any) {
    alert(this.formUpdateUsuarios.valid)
    if (this.formUpdateUsuarios.valid) {
      this.userService.updateUsuarios(form).subscribe(data => {
        this.showAllUsuarios();
        this.showModalMore('center', 'success', 'Usuario actualizado correctamente', false, 1500);
      })
    } else {
      this.ShowModal('Usuario', 'Error al actualizar usuario', 'error');
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


}
