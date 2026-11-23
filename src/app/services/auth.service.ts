import { API_URL } from './api.config';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const CLAVE_SESION = 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly url = `${API_URL}/login`;

  /** Llama al backend; si responde true guarda la sesión. */
  login(usuario: string, contrasena: string): Observable<boolean> {
    return this.http.post<boolean>(this.url, { usuario, contrasena }).pipe(
      tap((ok) => {
        if (ok) localStorage.setItem(CLAVE_SESION, usuario);
      }),
    );
  }

  /** Cierra la sesión y vuelve al login. */
  logout(): void {
    localStorage.removeItem(CLAVE_SESION);
    this.router.navigate(['/login']);
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem(CLAVE_SESION);
  }

  usuarioActual(): string | null {
    return localStorage.getItem(CLAVE_SESION);
  }
}
