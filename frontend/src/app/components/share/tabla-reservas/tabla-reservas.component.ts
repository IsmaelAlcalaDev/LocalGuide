import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-tabla-reservas',
  templateUrl: './tabla-reservas.component.html',
  styleUrl: './tabla-reservas.component.scss'
})
export class TablaReservasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['tourist', 'guide', 'reservationDate', 'startDate', 'endDate', 'status', 'reservedHours', 'price'];

  constructor( private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservaService.getReservations().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      error => {
        console.error('Error al cargar las reservaciones', error);
      }
    );
  }
}
