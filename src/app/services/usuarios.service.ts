import { API_URL } from './api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private readonly url = `${API_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.url, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, usuario);
  }

  actualizarParcialUsuario(id: number, usuario: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
