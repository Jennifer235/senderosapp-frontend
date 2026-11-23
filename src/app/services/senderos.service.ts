import { API_URL } from './api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SenderosService {

  private readonly url = `${API_URL}/senderos`;

  constructor(private http: HttpClient) {}

  public getSenderos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getSenderoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  crearSendero(sendero: any): Observable<any> {
    return this.http.post<any>(this.url, sendero);
  }

  actualizarSendero(id: number, sendero: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, sendero);
  }

  actualizarParcialSendero(id: number, sendero: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, sendero);
  }

  eliminarSendero(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
