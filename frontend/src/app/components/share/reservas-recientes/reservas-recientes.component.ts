import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-reservas-recientes',
  templateUrl: './reservas-recientes.component.html',
  styleUrl: './reservas-recientes.component.scss'
})
export class ReservasRecientesComponent {
  guias: any = [];
  reservasRecientes: any = [];

  constructor(private guiaService: GuiaService) { }

  ngOnInit(): void {
    this.guias = this.guiaService.guiasInput;
    this.reservasRecientes = this.guiaService.reservasRecientes;
  }
}
