import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-tabla-guias',
  templateUrl: './tabla-guias.component.html',
  styleUrls: ['./tabla-guias.component.scss']
})
export class TablaGuiasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'profileImg', 'name', 'surname', 'gender', 'country', 'city', 'phone', 'email',
    'hourlyPrice', 'languages', 'hobbies', 'reservations'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private guiaService: GuiaService) { }

  ngOnInit(): void {
    this.getGuides();
  }

  getGuides(): void {
    this.guiaService.getGuides().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error al cargar los datos de los guías', error);
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
