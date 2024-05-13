import { Component } from '@angular/core';
import { IdiomaService } from '../../../services/idiomaService/idioma.service';
import { AficionesService } from '../../../services/aficionesServices/aficiones.service';

@Component({
  selector: 'app-filtrar-guias',
  templateUrl: './filtrar-guias.component.html',
  styleUrl: './filtrar-guias.component.scss'
})
export class FiltrarGuiasComponent {
  hobbies: string[] = [];
  languages: string[] = [];
  
  constructor(private idiomaService: IdiomaService, private aficionesService: AficionesService) { }

  ngOnInit(): void {
    this.languages = this.chargeJsonLanguages(); // Assign the returned value to this.languages
    this.hobbies = this.chargueJsonHobbies(); // Assign the returned value to this.hobbies
  }

  chargeJsonLanguages(): string[] { // Modify the return type to string[]
    return this.idiomaService.getIdiomas(); // Return the list of languages
  }

  chargueJsonHobbies(): string[] {
    return this.aficionesService.getHobbies();
  }
}
