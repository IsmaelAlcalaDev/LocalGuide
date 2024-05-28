import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-resumen-reservas',
  templateUrl: './resumen-reservas.component.html',
  styleUrl: './resumen-reservas.component.scss'
})
export class ResumenReservasComponent {
  summaryReservations: any = [];
  guideId: any;

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
  this.guideId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
  this.getSummaryReservations();
  }

  getSummaryReservations() {
    this.reservaService.getSummaryReservation(this.guideId).subscribe(
      (response) => {
        this.summaryReservations = response;
      },
      (error: any) => {
        console.error('Error al obtener la reserva activa:', error);
      }
    );
  }
}
