import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-reservas-activas-turista',
  templateUrl: './reservas-activas-turista.component.html',
  styleUrl: './reservas-activas-turista.component.scss'
})
export class ReservasActivasTuristaComponent {
  reservasActivas: any[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.reservasActivas = this.reservaService.reservasActivas;
  }
}
