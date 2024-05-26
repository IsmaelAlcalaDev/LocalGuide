import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = environment.apiUrls;
  
  constructor(private http: HttpClient) {  }

  getTransaction(): any {
    return this.http.get<any>(this.apiUrl.transaction.listTransactions);
  }
}
