import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
guias:any = [];
reservasRecientes:any = [];
  
  constructor(private guiaService:GuiaService){}
  
  
 ngOnInit(){
  this.guias = this.guiaService.guiasInput;
  this.reservasRecientes = this.guiaService.reservasRecientes;
  // this.guiaService.getListaGuias().subscribe(items => this.guias = items);
}

actualizarGuia(event:Event){
console.log(event);
}
}
