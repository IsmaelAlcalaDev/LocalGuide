import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = environment.apiUrls;

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl.administrator.login, {}, { 
      params: new HttpParams()
        .set('email', email)
        .set('password', password)
        .set('userType', 'admin')
    });
  }

  getKpis(): Observable<any> {
    return this.http.get<any>(this.apiUrl.administrator.kpis);
  }
}