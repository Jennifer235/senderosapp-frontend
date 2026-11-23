import { API_URL } from './api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccesoriosService {

  private readonly url = `${API_URL}/accesorios`;

  constructor(private http: HttpClient) {}

  public getAccesorios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getAccesorioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  crearAccesorio(accesorio: any): Observable<any> {
    return this.http.post<any>(this.url, accesorio);
  }

  actualizarAccesorio(id: number, accesorio: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, accesorio);
  }

  actualizarParcialAccesorio(id: number, accesorio: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, accesorio);
  }

  eliminarAccesorio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
