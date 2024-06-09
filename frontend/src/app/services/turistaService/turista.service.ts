import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tourist } from '../../models/tourist.model';

@Injectable({
  providedIn: 'root'
})
export class TuristaService {
  private apiUrl = environment.apiUrls;

  constructor(private http: HttpClient) { }

  registerTourist(tourist: Tourist): Observable<any> {
    return this.http.post<any>(this.apiUrl.tourist.create, tourist);
  }

  updateTourist(tourist: Tourist): Observable<any> {
    return this.http.put<any>(this.apiUrl.tourist.update, tourist);
  }

  login(email: string, password: string): Observable<any> {
    // Definir los parámetros de la solicitud
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    // Realizar la solicitud POST con los parámetros
    return this.http.post<any>(this.apiUrl.tourist.login, {}, { params: params });
  }

  getTourist(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(this.apiUrl.tourist.listTourists);
  }
}
