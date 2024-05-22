import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-guia',
  templateUrl: './info-guia.component.html',
  styleUrls: ['./info-guia.component.scss']
})
export class InfoGuiaComponent {

  guide:any = {};
  reserveForm!: FormGroup;

  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private guiaService: GuiaService, 
    private validationService: ValidacionService
  ) { }
  
  ngOnInit(): void {
    this.reserveForm = this.validationService.validateReserveForm();
    this.getGuideDetails();
  }

  getGuideDetails(): void {
    this.route.params.subscribe(params => {
      const guiaId = +params['id']; // Obtén el ID del guía de los parámetros de la ruta
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
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
          this.reserveForm.value.startDate,
          this.reserveForm.value.endDate,
          this.reserveForm.value.hours
        ]
      );
    } else {
      // Marca todos los controles del formulario como "touched"
      this.markFormGroupTouched(this.reserveForm);
    }
  }
}