import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.comprobarUrlResumenReserva();
  }

  comprobarUrlResumenReserva() {
    const url = this.router.url;
    if (url.includes('resumen-reserva')) {
      return true;
    } else {
      return false;
    }
  }
}
