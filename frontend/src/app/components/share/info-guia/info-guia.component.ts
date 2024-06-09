import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { FormGroup } from '@angular/forms';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-info-guia',
  templateUrl: './info-guia.component.html',
  styleUrls: ['./info-guia.component.scss']
})
export class InfoGuiaComponent {

  guide: any = {};
  reserveForm!: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guiaService: GuiaService,
    private validationService: ValidacionService,
    private reservationService: ReservaService
  ) { }

  ngOnInit(): void {
    this.reserveForm = this.validationService.validateReserveForm();
    this.getGuideDetails();
    this.loadReviews();
    console.log(this.guide.id);
  }

  getGuideDetails(): void {
    this.route.params.subscribe(params => {
      const guiaId = +params['id'];
      this.guiaService.getGuideDetails(guiaId).subscribe(
        (guideDetails: any) => {
          this.guide = guideDetails;
        },
        (error: any) => {
          this.router.navigate(['/inicio']);
          console.error('Error al obtener los detalles del guía:', error);
        }
      );
    });
  }

  reserveGuide(): void {
    if (this.reserveForm.valid) {
      this.router.navigate(
        [
          '/pago-reserva',
          this.guide.id,
          this.guide.hourlyPrice,
          this.guide.name,
          encodeURIComponent(this.reserveForm.value.startDate),
          encodeURIComponent(this.reserveForm.value.endDate),
          this.reserveForm.value.hours
        ]
      );
    } else {
      // Marca todos los controles del formulario como "touched"
      this.validationService.markFormGroupTouched(this.reserveForm);
    }
  }

  loadReviews(): void {
    this.route.params.subscribe(params => {
      const guiaId = +params['id'];
      this.reservationService.getReviewGuide(guiaId)
        .subscribe(
          (data: any) => {
            this.reviews = data;
          },
          (error: any) => {
            console.error('Error al cargar las reseñas', error);
          }
        );
    });
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