import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-reservas-activas-guia',
  templateUrl: './reservas-activas-guia.component.html',
  styleUrl: './reservas-activas-guia.component.scss'
})
export class ReservasActivasGuiaComponent {
  reservasActivas: any[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.reservasActivas = this.reservaService.reservasActivas;
  }
}
