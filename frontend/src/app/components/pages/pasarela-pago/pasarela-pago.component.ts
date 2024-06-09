import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.scss'
})
export class PasarelaPagoComponent {
  selectedPlan: string;

  constructor(private router: Router) {
    this.selectedPlan = ''; // Inicialmente no hay ningún plan seleccionado
  }

  ngOnInit() {
    this.comprobarUrlPagoReserva();
  }

  comprobarUrlPagoReserva() {
    const url = this.router.url;
    if (url.includes('pago-reserva')) {
      return true;
    } else {
      return false;
    }
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }
}
