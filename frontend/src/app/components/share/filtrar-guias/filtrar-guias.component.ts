import { Component } from '@angular/core';
import { IdiomaService } from '../../../services/idiomaService/idioma.service';
import { AficionesService } from '../../../services/aficionesServices/aficiones.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtrar-guias',
  templateUrl: './filtrar-guias.component.html',
  styleUrls: ['./filtrar-guias.component.scss']
})
export class FiltrarGuiasComponent {
  filterForm!: FormGroup;
  hobbies: string[] = [];
  languages: string[] = [];
  countries: string[] = [];
  selectedCountry: string = '';
  cities: { [key: string]: string[] } = {};
  
  constructor(
    private formBuilder: FormBuilder,
    private idiomaService: IdiomaService, 
    private aficionesService: AficionesService, 
    private ubicacionService: UbicacionService
  ) { }

  ngOnInit(): void {
    this.languages = this.chargeJsonLanguages();
    this.hobbies = this.chargueJsonHobbies();
    this.filterForm = this.formBuilder.group({
      country: [''],
      city: ['']
    });
    this.chargeJsonLocation();
    this.changeCity();
  }

  chargeJsonLocation() {
    this.ubicacionService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.ubicacionService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

changeCity() {
  this.filterForm.get('country')?.valueChanges.subscribe(country => {
    this.selectedCountry = country;
    if (this.cities) {
      this.filterForm.get('city')?.setValue(''); // Limpiar la ciudad seleccionada al cambiar de país
      this.filterForm.get('city')?.enable(); // Habilitar el select de ciudad
      this.filterForm.get('city')?.updateValueAndValidity(); // Actualizar el valor y la validez del select de ciudad
      // Filtrar las ciudades correspondientes al país seleccionado
      const countryCities = this.cities[country];
      if (countryCities) {
        this.filterForm.get('city')?.setValue(countryCities[0]); // Establecer la primera ciudad como valor por defecto
      }
    }
  });
}

  

  chargeJsonLanguages(): string[] {
    return this.idiomaService.getIdiomas();
  }

  chargueJsonHobbies(): string[] {
    return this.aficionesService.getHobbies();
  }
}
