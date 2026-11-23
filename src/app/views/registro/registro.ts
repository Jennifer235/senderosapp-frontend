import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../material/material.module';
import { UsuariosService } from '../../services/usuarios.service';

/** Valida que "contrasena" y "confirmar" sean iguales. */
function contrasenasIguales(grupo: AbstractControl): ValidationErrors | null {
  const contrasena = grupo.get('contrasena')?.value;
  const confirmar = grupo.get('confirmar')?.value;
  return contrasena && confirmar && contrasena !== confirmar ? { noCoinciden: true } : null;
}

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
  ) {
    // Mismos campos y límites que la tabla "usuarios" de PostgreSQL
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(100)]],
        apellido: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
        telefono: ['', [Validators.pattern(/^[0-9+ ]{7,20}$/)]],
        contrasena: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
        ],
        confirmar: ['', [Validators.required]],
      },
      { validators: contrasenasIguales },
    );
  }

  Registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, apellido, email, telefono, contrasena } = this.form.value;
    // rol, activo y fecha_registro los pone la base de datos por defecto
    const usuario = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono?.trim() || null,
      contrasena,
    };

    this.usuariosService.crearUsuario(usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: `Bienvenido(a) ${usuario.nombre}, ya puedes iniciar sesión.`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => this.router.navigate(['/login']));
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar',
          text: this.mensajeDeError(err),
          confirmButtonText: 'Entendido',
        });
      },
    });
  }

  /** Explica qué falló según el código HTTP del backend. */
  private mensajeDeError(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'No se pudo conectar con el backend. ¿Está encendido (npm start)?';
    }
    if (err.status === 409) {
      return 'Ya existe una cuenta con ese correo.';
    }
    return err.error?.error ?? 'Ocurrió un error inesperado.';
  }
}
