import { Component } from '@angular/core';

@Component({
  selector: 'app-pago-reserva',
  templateUrl: './pago-reserva.component.html',
  styleUrl: './pago-reserva.component.scss'
})
export class PagoReservaComponent {
pagoRealizado: boolean = true;
datosReserva: any = 
  {
    "fechaInicio": "2024-04-25",
    "fechaFin": "2024-04-25",
    "precioHora": 20,
    "nHoras": 3,
    "nombre": "Juan Pérez",
    "correo": "juan.perez@example.com",
    "telefono": "+1234567890"
  }

}
