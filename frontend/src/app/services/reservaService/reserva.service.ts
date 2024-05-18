import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.apiUrls;
  
  constructor(private http: HttpClient) {  }

  getRecentReservation(): Observable<any> {
    return this.http.get<any>(this.apiUrl.reservation.recent);
  }
  

  reservasActivas: any[] = [
    {
      guia: {
        nombre: "Javier",
        ciudad: "Barcelona",
        pais: "España",
        ciudadFoto: "../../../../assets/images/ciudad.jpeg",
        correo: "javier@example.com",
        whatsapp: "123456789"
      },
      fechaInicio: "2024-04-25",
      fechaFin: "2024-04-27",
      horas: 10,
      rating: null,
      precio: 100
    },
    {
      guia: {
        nombre: "Maria",
        ciudad: "Madrid",
        pais: "España",
        ciudadFoto: "../../../../assets/images/ciudad.jpeg",
        correo: "maria@example.com",
        whatsapp: "987654321"
      },
      fechaInicio: "2024-05-15",
      fechaFin: "2024-05-17",
      horas: 8,
      rating: 4,
      precio: 80
    },
    {
      guia: {
        nombre: "Laura",
        ciudad: "Roma",
        pais: "Italia",
        ciudadFoto: "../../../../assets/images/ciudad.jpeg",
        correo: "laura@example.com",
        whatsapp: "555444333"
      },
      fechaInicio: "2024-06-01",
      fechaFin: "2024-06-03",
      horas: 12,
      rating: 4,
      precio: 120
    }
  ];
  
}
