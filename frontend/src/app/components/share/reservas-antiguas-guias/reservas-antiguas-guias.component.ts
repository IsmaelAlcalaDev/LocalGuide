import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import { MediaService } from '../../../services/mediaService/media.service';

@Component({
  selector: 'app-reservas-antiguas-guias',
  templateUrl: './reservas-antiguas-guias.component.html',
  styleUrl: './reservas-antiguas-guias.component.scss'
})
export class ReservasAntiguasGuiasComponent {
  pastReservation: any = [];
  guideId: any;
  guide: any;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  imagesCountry: { [key: string]: string } = {};

  constructor(private reservaService: ReservaService, private mediaService: MediaService) { }

  ngOnInit() {
    this.guideId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    this.guide = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.getPastGuideReservation();
    this.mediaService.getCountriesImages().subscribe(data => {
      this.imagesCountry = data;
    });
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
