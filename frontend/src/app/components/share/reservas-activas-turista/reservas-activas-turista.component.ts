import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';

@Component({
  selector: 'app-reservas-activas-turista',
  templateUrl: './reservas-activas-turista.component.html',
  styleUrl: './reservas-activas-turista.component.scss'
})
export class ReservasActivasTuristaComponent {
  activeReservation: any = [];
  touristId: any;
  phonePrefixes: { [key: string]: string } = {};
  cancelReservationDate: any;
  pageSize: number = 6; 
  currentPage: number = 1; 

  constructor(private reservaService: ReservaService, private ubicacionService: UbicacionService) { }

  ngOnInit() {
    this.touristId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    this.getActiveReservationTourist();
    this.getPhonePrefixes();
  }

  getPhonePrefixes() {
    this.ubicacionService.getPhonePrefixes().subscribe(prefixes => {
      this.phonePrefixes = prefixes;
    });
  }

  getActiveReservationTourist() {
    this.reservaService.getActiveReservationTourist(this.touristId).subscribe(
      (response) => {
        this.activeReservation = response;
      },
      (error: any) => {
        console.error('Error al obtener la reserva activa:', error);
      }
    );
  }

  hasMoreThan24HoursPassed(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    const millisecondsDifference = now.getTime() - date.getTime();
    const hoursDifference = millisecondsDifference / (1000 * 60 * 60);
    return hoursDifference > 48;
  }

  deletedReservation(reservationId: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de que deseas cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteReservation(reservationId);
      }
    });
  }

  deleteReservation(reservationId: number) {
    this.reservaService.deletedReservation(reservationId).subscribe(
      (response) => {
        this.getActiveReservationTourist();
        Swal.fire('Borrado exitoso', 'La reserva ha sido cancelada', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al cancelar la reserva', 'error');
        console.error('Error al cancelar la reserva');
      }
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event;
  }
}
