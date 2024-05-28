import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransaccionService } from '../../../services/transaccionService/transaccion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-transacciones',
  templateUrl: './tabla-transacciones.component.html',
  styleUrl: './tabla-transacciones.component.scss'
})
export class TablaTransaccionesComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['reservation','transactionDate','type', 'paymentType','amount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    this.transaccionService.getTransaction().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error al cargar los datos de las transacciones', error);
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
