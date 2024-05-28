import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-reservas-activas-guia',
  templateUrl: './reservas-activas-guia.component.html',
  styleUrl: './reservas-activas-guia.component.scss'
})
export class ReservasActivasGuiaComponent {
  activeReservation: any = [];
  guideId: any;
  phonePrefixes: { [key: string]: string } = {};
  cancelReservationDate: any;
  pageSize: number = 6; 
  currentPage: number = 1; 

  constructor(private reservaService: ReservaService, private ubicacionService: UbicacionService) { }

  ngOnInit() {
    this.guideId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    this.getActiveGuideReservation();
    this.getPhonePrefixes();
  }

  getPhonePrefixes() {
    this.ubicacionService.getPhonePrefixes().subscribe(prefixes => {
      this.phonePrefixes = prefixes;
    });
  }

  getActiveGuideReservation() {
    this.reservaService.getActiveGuideReservation(this.guideId).subscribe(
      (reservation: any) => {
        this.activeReservation = reservation;
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
        // Si la petición se completó con éxito, actualiza las reservas activas
        this.getActiveGuideReservation();
        // Muestra un mensaje de éxito genérico
        Swal.fire('Borrado exitoso', 'La reserva ha sido cancelada', 'success');
      },
      (error) => {
        // En caso de error en la petición, muestra un mensaje de error genérico
        Swal.fire('Error', 'Hubo un problema al cancelar la reserva', 'error');
        console.error('Error al cancelar la reserva');
      }
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
