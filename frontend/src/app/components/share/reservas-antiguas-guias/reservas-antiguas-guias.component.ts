import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-reservas-antiguas-guias',
  templateUrl: './reservas-antiguas-guias.component.html',
  styleUrl: './reservas-antiguas-guias.component.scss'
})
export class ReservasAntiguasGuiasComponent {
  pastReservation: any = [];
  guideId: any;
  pageSize: number = 6; 
  currentPage: number = 1; 

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.guideId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    this.getPastGuideReservation();
  }

  getPastGuideReservation() {
    this.reservaService.getPastGuideReservation(this.guideId).subscribe(
      (reservation: any) => {
        this.pastReservation = reservation;
      },
      (error: any) => {
        console.error('Error al obtener la reserva activa:', error);
      }
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
