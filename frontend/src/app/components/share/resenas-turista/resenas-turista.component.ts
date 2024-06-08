import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-resenas-turista',
  templateUrl: './resenas-turista.component.html',
  styleUrl: './resenas-turista.component.scss'
})
export class ResenasTuristaComponent {
  reviews: any[] = [];
  userData: any;
  currentPage: number = 1;
  itemsPerPage: number = 3; 

  constructor(private reservationService : ReservaService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.loadReviews();
    
  }

  loadReviews(): void {
    this.reservationService.getReviewsTourist(this.userData.id)
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
