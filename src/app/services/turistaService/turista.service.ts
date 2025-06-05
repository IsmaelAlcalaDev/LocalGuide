import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tourist } from '../../models/tourist.model';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TuristaService {
  private apiUrl = environment.apiUrls;

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) { }

  registerTourist(tourist: Tourist): Observable<any> {
    tourist.typeUser = 'tourist';
    return this.http.post<any>(this.apiUrl.tourist.create, { ...tourist, userType: 'tourist' });
  }

  updateTourist(tourist: Tourist): Observable<any> {
    return this.http.put<any>(this.apiUrl.tourist.update, tourist);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl.tourist.login, {}, { 
      params: new HttpParams()
        .set('email', email)
        .set('password', password)
        .set('userType', 'tourist')
    });
  }

  getTourist(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(this.apiUrl.tourist.listTourists);
  }
}