import { Component } from '@angular/core';

@Component({
  selector: 'app-pago-aumento-visibilidad',
  templateUrl: './pago-aumento-visibilidad.component.html',
  styleUrl: './pago-aumento-visibilidad.component.scss'
})
export class PagoAumentoVisibilidadComponent {
  selectedPlan: string;
  datosSuscripcion: any;
  planSeleccionado: boolean = false;
  pagoRealizado: boolean = false;

  constructor() {
    this.selectedPlan = ''; // Inicialmente no hay ningún plan seleccionado
    this.datosSuscripcion = {
      nombre: '',
      precioMensual: 0
    };
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
    // Asignar los datos correspondientes al plan seleccionado
    if (plan === 'plan1') {
      this.datosSuscripcion = {
        nombre: 'Plan Básico',
        precioMensual: 19.99
      };
    } else if (plan === 'plan2') {
      this.datosSuscripcion = {
        nombre: 'Plan Estándar',
        precioMensual: 13.99
      };
    } else if (plan === 'plan3') {
      this.datosSuscripcion = {
        nombre: 'Plan Premium',
        precioMensual: 10.00
      };
    }
    this.planSeleccionado = true; // Marcar que se ha seleccionado un plan
  }
}
