import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Transaction } from '../../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = environment.apiUrls;
  
  constructor(private http: HttpClient) {  }

  getTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl.transaction.listTransactions);
  }
}
