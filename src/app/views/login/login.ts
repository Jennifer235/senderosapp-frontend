import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  cargando = false;

  form: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  Loguear() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.user.trim().toLowerCase();
    const contrasena = this.form.value.password;
    this.cargando = true;

    this.auth.login(email, contrasena).subscribe({
      next: (ok) => {
        this.cargando = false;
        if (ok) {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido(a)',
            text: email,
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => this.router.navigate(['/usuarios']));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Correo o contraseña incorrectos, o el usuario está inactivo.',
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            err.status === 0
              ? 'No se pudo conectar con el backend. ¿Está encendido (npm start)?'
              : (err.error?.error ?? 'Ocurrió un error inesperado.'),
        });
      },
    });
  }
}
