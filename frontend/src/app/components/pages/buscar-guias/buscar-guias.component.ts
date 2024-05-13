import { Component, OnInit } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-buscar-guias',
  templateUrl: './buscar-guias.component.html',
  styleUrls: ['./buscar-guias.component.scss'] // Corregir la propiedad styleUrl por styleUrls
})
export class BuscarGuiasComponent implements OnInit { // Implementar la interfaz OnInit

  guias: any = [];
  reservasRecientes: any = [];

  constructor(private guiaService: GuiaService) {}

  ngOnInit(): void { // Cambiar el tipo de retorno de la función ngOnInit a void
    this.guias = this.guiaService.guiasInput;
    this.reservasRecientes = this.guiaService.reservasRecientes;
  }
}
