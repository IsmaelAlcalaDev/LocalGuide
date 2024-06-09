import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-resenas-guia',
  templateUrl: './resenas-guia.component.html',
  styleUrl: './resenas-guia.component.scss'
})
export class ResenasGuiaComponent {
  reviews: any[] = [];
  userData: any;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private reservationService: ReservaService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.loadReviews();
  }

  loadReviews(): void {
    this.reservationService.getReviewGuide(this.userData.id)
      .subscribe(
        (data: any) => {
          this.reviews = data;
        },
        (error: any) => {
          console.error('Error al cargar las reseñas', error);
        }
      );
  }

  getPaginatedReview(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reviews.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
