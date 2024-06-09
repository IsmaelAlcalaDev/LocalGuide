import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) { }

  getHobbies(): Observable<string[]> {
    return this.http.get<string[]>('../../../../assets/json/hobbies.json');
  }
}
