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
image:any = '';
  
  constructor(private guiaService:GuiaService){}
  
  
 ngOnInit(){
  this.guias = this.guiaService.guiasInput;
  this.reservasRecientes = this.guiaService.reservasRecientes;
}

actualizarGuia(event:Event){
console.log(event);
}
}
