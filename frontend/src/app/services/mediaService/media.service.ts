import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  getCountriesImages(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>('../../../../assets/json/imagesCountry.json');
  }
}
