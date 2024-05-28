import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TuristaService } from '../../../services/turistaService/turista.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-turistas',
  templateUrl: './tabla-turistas.component.html',
  styleUrl: './tabla-turistas.component.scss'
})
export class TablaTuristasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['profileImg', 'name', 'surname','gender', 'country', 'city', 'phone', 'email'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private touristService: TuristaService) {}

  ngOnInit(): void {
    this.getTourist();
  }

  getTourist(): void {
    this.touristService.getTourist().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error al cargar los datos de los turistas', error);
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
