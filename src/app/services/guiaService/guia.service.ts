import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guide } from '../../models/guide.model';
import { Gender } from '../../models/gender.enum';
import { SupabaseService } from '../supabase.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  private apiUrl = environment.apiUrls;
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) { }

  registerGuide(guide: Guide): Observable<any> {
    guide.typeUser = 'guide';
    return this.http.post<any>(this.apiUrl.guide.create, { ...guide, userType: 'guide' });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl.guide.login, {}, { 
      params: new HttpParams()
        .set('email', email)
        .set('password', password)
        .set('userType', 'guide')
    });
  }

  updateGuide(guide: Guide, id: any): Observable<any> {
    const path = `${this.apiUrl.guide.update}/${id}`;
    return this.http.put<any>(path, guide, { headers: this.headerDict });
  }

  getTopRatedGuides(): Observable<any> {
    return this.http.get<any>(this.apiUrl.guide.topRated);
  }

  getGuideDetails(id: number): Observable<Guide> {
    return this.http.get<Guide>(`${this.apiUrl.guide.detailGuide}?id=${id}`);
  }

  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.apiUrl.guide.listGuides);
  }

  getGuideFilter(guideName: string | null, country: string | null, city: string | null, priceMin: string | null, priceMax: string | null, gender: Gender | null, languages: string[], hobbies: string[]): Observable<any> {
    let httpParams = new HttpParams();

    // Añadir los parámetros
    if (guideName) {
      httpParams = httpParams.set('guideName', guideName);
    }
    if (country) {
      httpParams = httpParams.set('country', country);
    }
    if (city) {
      httpParams = httpParams.set('city', city);
    }
    if (priceMin !== null) {
      httpParams = httpParams.set('priceMin', priceMin);
    }
    if (priceMax !== null) {
      httpParams = httpParams.set('priceMax', priceMax);
    }
    if (gender !== null) {
      httpParams = httpParams.set('gender', gender);
    }
    if (languages && languages.length > 0) {
      languages.forEach(language => {
        httpParams = httpParams.append('languages', language);
      });
    }
    if (hobbies && hobbies.length > 0) {
      hobbies.forEach(hobby => {
        httpParams = httpParams.append('hobbies', hobby);
      });
    }

    return this.http.get<any>(this.apiUrl.guide.filter, { params: httpParams });
  }
}