import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { ReservationStatus } from '../../../models/reservationStatus.enum';
import { TransactionType } from '../../../models/transactionType.enum';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import { Reservation } from '../../../models/reservation.model';
import { Transaction } from '../../../models/transaction.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pago-reserva',
  templateUrl: './pago-reserva.component.html',
  styleUrl: './pago-reserva.component.scss'
})
export class PagoReservaComponent {

  paymentDetails: any = {};
  paymentCompleted: boolean = false;
  paymentForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private validationService: ValidacionService,
    private reservationService: ReservaService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.paymentForm = this.validationService.validatePaymentForm();
  }

  getParams() {
    // Recuperar parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.paymentDetails = {
        id: params.get('id'),
        hourlyPrice: params.get('price'),
        name: params.get('name'),
        startDate: new Date(decodeURIComponent(params.get('startDate') || '')),
        endDate: new Date(decodeURIComponent(params.get('endDate') || '')),
        hours: params.get('hours')
      };
    });
  }

  calculateTotalPrice(): number {
    const hourlyPrice = this.paymentDetails.hourlyPrice;
    const hours = this.paymentDetails.hours;
    const commission = 5;
    return (hourlyPrice * hours) + ((hourlyPrice * hours) * commission) / 100
  }

  formatCardNumber(event: any): void {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value.replace(/\s+/g, '');
    const formattedValue = currentValue.replace(/(\d{4})/g, '$1 ').trim();
    input.value = formattedValue;
  }

  formatExpiryDate(event: any): void {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    if (currentValue.length === 2 && currentValue.charAt(1) !== '/') {
      input.value = currentValue + '/';
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  getUser(): any {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  createReservation(userId: Number): any {
    return {
      tourist: Number(userId),
      guide: Number(this.paymentDetails.id),
      startDate: this.paymentDetails.startDate,
      paymentType: this.paymentForm?.get('paymentMethod')?.value,
      endDate: this.paymentDetails.endDate,
      reservedHours: Number(this.paymentDetails.hours),
      totalPrice: this.calculateTotalPrice()
    };
  }

  processPayment(): void {
    const user = this.getUser();
    let userId: Number | null = null;

    if (user === null) {
      this.showSnackbar('Por favor inicia sesión para realizar una reserva');
    } else if (user.typeUser === 'guide') {
      this.showSnackbar('Inicia sesión con una cuenta de turista para realizar la reserva');
    } else {
      userId = user.id;
    }

    if (this.paymentForm && this.paymentForm?.valid) {

      const reservation = this.createReservation(userId!);

      this.reservationService.processReservation(reservation).subscribe(
        (response: string) => {
          this.paymentCompleted = true;
          setTimeout(() => {
            this.paymentCompleted = false;
          }, 3000);
        },
        (error: any) => {
          console.error('Error al procesar el pago:', error);
        }
      );
    } else {
      this.validationService.markFormGroupTouched(this.paymentForm!);
    }
  }


}
