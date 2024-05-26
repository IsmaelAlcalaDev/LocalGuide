import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = environment.apiUrls;

  constructor( private http: HttpClient ) { }

  login(email: string, password: string): Observable<any> {
    // Definir los parámetros de la solicitud
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<any>(this.apiUrl.administrator.login, {}, { params: params });
  }

  getKpis(): Observable<any> {
    return this.http.get<any>(this.apiUrl.administrator.kpis);
  }
}
