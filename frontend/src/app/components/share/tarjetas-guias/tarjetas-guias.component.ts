import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-tarjetas-guias',
  templateUrl: './tarjetas-guias.component.html',
  styleUrl: './tarjetas-guias.component.scss'
})
export class TarjetasGuiasComponent {
  guias: any[] = []; // Lista completa de guías
  paginatedGuias: any[] = []; // Lista de guías para mostrar en la página actual
  totalGuias: number = 0; // Total de guías
  pageSize: number = 6; // Tamaño de página

  constructor(private guiaService: GuiaService) { }

  ngOnInit(): void {
    this.guias = this.guiaService.guiasInput;
  }
}
