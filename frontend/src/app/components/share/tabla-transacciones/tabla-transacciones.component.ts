import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransaccionService } from '../../../services/transaccionService/transaccion.service';

@Component({
  selector: 'app-tabla-transacciones',
  templateUrl: './tabla-transacciones.component.html',
  styleUrl: './tabla-transacciones.component.scss'
})
export class TablaTransaccionesComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['reservation','transactionDate','type', 'paymentType','amount'];

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    this.transaccionService.getTransaction().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource<any>(data);
      },
      (error: any) => {
        console.error('Error al cargar los datos de las transacciones', error);
      }
    );
  }
}
