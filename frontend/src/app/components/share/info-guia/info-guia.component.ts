import { Component } from '@angular/core';

@Component({
  selector: 'app-info-guia',
  templateUrl: './info-guia.component.html',
  styleUrls: ['./info-guia.component.scss']
})
export class InfoGuiaComponent {

  profileImg: string = "../../../../assets/images/ciudad.jpeg";
  existBackgroundCheckCertificate: boolean = true; // Debes definir estas variables según corresponda en tu lógica
  existIdentityDocument: boolean = false;
  guide = {
    city: 'ciudad',
    country: 'país',
    phrase: 'mi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudadmi plan perfecto para conocer la ciudad',
    additionalInfo: 'información adicionalinformación adicionalinformación adicionalinformación adicionalinformación adicionalinformación adicional',
    hourlyPrice: 'precio',
    name: 'nombre',
    surname: 'apellido',
    gender: 'FEMENINO'
  };
  hobbies: string[] = ['Hobbie 1', 'Hobbie 2', 'Hobbie 3','Idioma 1', 'Idioma 2', 'Idioma 3']; // Debes definir estos arreglos según corresponda en tu lógica
  languages: string[] = ['Idioma 1', 'Idioma 2', 'Idioma 3','Idioma 1', 'Idioma 2', 'Idioma 3'];

  constructor() { }

}