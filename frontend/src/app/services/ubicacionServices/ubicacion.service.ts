import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>('../../../../assets/json/countries.json');
  }

  getCities(): Observable<{ [key: string]: string[] }> {
    return this.http.get<{ [key: string]: string[] }>('../../../../assets/json/cities.json');
  }

  getPhonePrefixes(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>('../../../../assets/json/phonePrefixes.json');
  }
  
}