import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReservaService } from '../../../services/reservaService/reserva.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-reservas',
  templateUrl: './tabla-reservas.component.html',
  styleUrl: './tabla-reservas.component.scss'
})
export class TablaReservasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['tourist', 'guide', 'reservationDate', 'startDate', 'endDate', 'status', 'reservedHours', 'price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservaService.getReservations().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error al cargar las reservaciones', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
