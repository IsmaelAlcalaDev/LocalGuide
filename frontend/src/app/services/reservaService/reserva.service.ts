import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.apiUrls;

  constructor(private http: HttpClient) { }

  getRecentReservation(): Observable<any> {
    return this.http.get<any>(this.apiUrl.reservation.recent);
  }

  processReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.reservation.process, reservation);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl.reservation.listReservations);
  }

  getActiveGuideReservation(guideId: any): Observable<any> {
    const url = `${this.apiUrl.guide.activeReservation}/${guideId}`;
    return this.http.get<any>(url);
  }

  getPastGuideReservation(guideId: any): Observable<any> {
    const url = `${this.apiUrl.guide.pastReservation}/${guideId}`;
    return this.http.get<any>(url);
  }

  getActiveReservationTourist(touristId: any): Observable<any> {
    const url = `${this.apiUrl.tourist.activeReservation}/${touristId}`;
    return this.http.get<any>(url);
  }

  getPastTouristReservation(touristId: any): Observable<any> {
    const url = `${this.apiUrl.tourist.pastReservation}/${touristId}`;
    return this.http.get<any>(url);
  }

  getSummaryReservation(guideId: any): Observable<any> {
    const url = `${this.apiUrl.guide.summaryReservation}/${guideId}`;
    return this.http.get<any>(url);
  }

  deletedReservation(reservationId: number): Observable<any> {
    const url = `${this.apiUrl.reservation.deleteReservation}/${reservationId}`;
    return this.http.delete<any>(url);
  }

  leaveReview(reservationId: number, review: string, score: number) {
    const url = `http://localhost:8080/local-guide/api/reservation/v1/leaveReview/${reservationId}`;
    return this.http.put<any>(url, { review, score });
  }

  getReviewsTourist(idTourist: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.reservation.touristReviews}/${idTourist}`);
  }

  getReviewGuide(idGuide: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.reservation.guideReviews}/${idGuide}`);
  }

  acceptReservation(reservationId: number): Observable<any> {
    const url = `${this.apiUrl.reservation.acceptReservation}/${reservationId}`;
    return this.http.post<any>(url, {});
  }

}
