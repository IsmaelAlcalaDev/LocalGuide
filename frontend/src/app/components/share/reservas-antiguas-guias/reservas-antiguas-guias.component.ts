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
  currentPage: number = 1;
  itemsPerPage: number = 6;

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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedReservation(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pastReservation.slice(startIndex, endIndex);
  }
}
