import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TuristaService } from '../../../services/turistaService/turista.service';

@Component({
  selector: 'app-tabla-turistas',
  templateUrl: './tabla-turistas.component.html',
  styleUrl: './tabla-turistas.component.scss'
})
export class TablaTuristasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['profileImg', 'name', 'surname','gender', 'country', 'city', 'phone', 'email'];

  constructor( private touristService: TuristaService) {}

  ngOnInit(): void {
    this.getTourist();
  }

  getTourist(): void {
    this.touristService.getTourist().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource<any>(data);
      },
      error => {
        console.error('Error al cargar los datos de los turistas', error);
      }
    );
  }
}
