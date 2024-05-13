import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-reservas-antiguas-turista',
  templateUrl: './reservas-antiguas-turista.component.html',
  styleUrl: './reservas-antiguas-turista.component.scss'
})
export class ReservasAntiguasTuristaComponent {
  reservasActivas: any[] = [];
  pageSize: number = 6; // Define el número de elementos por página
  currentPage: number = 1; // Define la página actual
  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.reservasActivas = this.reservaService.reservasActivas;
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
