import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-tabla-guias',
  templateUrl: './tabla-guias.component.html',
  styleUrl: './tabla-guias.component.scss'
})
export class TablaGuiasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = 
  [
    'profileImg', 'name', 'surname','gender', 'country', 'city', 'phone', 'email',
    'hourlyPrice', 'languages', 'hobbies', 'reservations'
  ];

  constructor(private guiaService: GuiaService) {}

  ngOnInit(): void {
    this.getGuides();
  }

  getGuides(): void {
    this.guiaService.getGuides().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource<any>(data);
      },
      error => {
        console.error('Error al cargar los datos de los turistas', error);
      }
    );
  }

}
