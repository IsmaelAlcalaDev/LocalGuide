import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import { DialogoResenaComponent } from '../dialogo-resena/dialogo-resena.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { response } from 'express';
import { MediaService } from '../../../services/mediaService/media.service';

@Component({
  selector: 'app-reservas-antiguas-turista',
  templateUrl: './reservas-antiguas-turista.component.html',
  styleUrl: './reservas-antiguas-turista.component.scss'
})
export class ReservasAntiguasTuristaComponent {
  pastReservation: any = [];
  touristId: any;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  imagesCountry: { [key: string]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private dialog: MatDialog,
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    this.touristId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    this.getPastTouristReservation();
    this.mediaService.getCountriesImages().subscribe(data => {
      this.imagesCountry = data;
    });
  }

  getPastTouristReservation() {
    this.reservaService.getPastTouristReservation(this.touristId).subscribe(
      (response) => {
        this.pastReservation = response;
      },
      (error: any) => {
        console.error('Error al obtener la reserva activa:', error);
      }
    );
  }

  openLeaveReviewDialog(reservationData: any): void {
    const dialogRef = this.dialog.open(DialogoResenaComponent, {
      width: '800px',
      data: { reservationData: reservationData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { resena, score } = result as { resena: string, score: number };
        this.leaveReview(reservationData.id, resena, score);
      }
    });
  }

  leaveReview(reservationId: any, review: string, score: number) {
    this.reservaService.leaveReview(reservationId, review, score).subscribe(
      (response) => {
        this.getPastTouristReservation();
        this.showSuccessAlert();
      },
      (error) => {
        this.showErrorAlert();
      }
    );
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Reseña enviada',
      text: '¡Gracias por tu reseña!',
      confirmButtonText: 'Cerrar'
    });
  }

  showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo enviar la reseña',
      confirmButtonText: 'Cerrar'
    });
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
