import { Component, EventEmitter, Output } from '@angular/core';
import { IdiomaService } from '../../../services/idiomaService/idioma.service';
import { AficionesService } from '../../../services/aficionesServices/aficiones.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { GuideFilterService } from '../../../services/guideFilterService/guide-filter.service';
import { Gender } from '../../../models/gender.enum';
import { ActivatedRoute } from '@angular/router';

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
  selectedLanguages: string[] = [];
  selectedHobbies: string[] = [];
  flag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private idiomaService: IdiomaService,
    private aficionesService: AficionesService,
    private ubicacionService: UbicacionService,
    private guideService: GuiaService,
    private guideFilterService: GuideFilterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.languages = this.chargeJsonLanguages();
    this.hobbies = this.chargueJsonHobbies();
    this.filterForm = this.formBuilder.group({
      guideName: [''],
      country: [''],
      city: [''],
      gender: [''],
      priceMin: [null],
      priceMax: [null]
    });
    this.chargeJsonLocation();
    this.changeCity();
    this.route.params.subscribe(params => {
      this.flag = params['flag'] === 'true';
    });
    if (!this.flag) {
      this.filterGuides();
    }
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
        this.filterForm.get('city')?.setValue('');
        this.filterForm.get('city')?.enable();
        this.filterForm.get('city')?.updateValueAndValidity();
        const countryCities = this.cities[country];
        if (countryCities) {
          this.filterForm.get('city')?.setValue(countryCities[0]);
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

  onLanguageChange(language: string) {
    const index = this.selectedLanguages.indexOf(language);
    if (index === -1) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages.splice(index, 1);
    }
  }

  onHobbyChange(hobby: string) {
    const index = this.selectedHobbies.indexOf(hobby);
    if (index === -1) {
      // Si la actividad no está en el array, la agregamos
      this.selectedHobbies.push(hobby);
    } else {
      // Si la actividad ya está en el array, la eliminamos
      this.selectedHobbies.splice(index, 1);
    }
  }

  resetFilter() {
    this.filterForm.reset();
    this.selectedLanguages = [];
    this.selectedHobbies = [];
    this.filterGuides();
  }

  filterGuides(): void {
    const selectedHobbies: string[] = this.selectedHobbies;

    const selectedLanguages: string[] = this.selectedLanguages;

    let priceMinValue = this.filterForm.get('priceMin')?.value;
    let priceMaxValue = this.filterForm.get('priceMax')?.value;

    if (priceMinValue === undefined) {
      priceMinValue = null;
    }
    if (priceMaxValue === undefined) {
      priceMaxValue = null;
    }

    let genderValue = null;
    const gender = this.filterForm.get('gender')?.value;
    if (gender) {
      if (gender === 'MASCULINO') {
        genderValue = Gender.MASCULINO;
      } else if (gender === 'FEMENINO') {
        genderValue = Gender.FEMENINO;
      } else if (gender === 'OTRO') {
        genderValue = Gender.OTRO;
      }
    }

    const params = {
      guideName: this.filterForm.get('guideName')?.value,
      country: this.filterForm.get('country')?.value,
      city: this.filterForm.get('city')?.value,
      priceMin: priceMinValue,
      priceMax: priceMaxValue,
      gender: genderValue,
      languages: selectedLanguages,
      hobbies: selectedHobbies,
    };

    this.guideService.getGuideFilter(
      params.guideName,
      params.country,
      params.city,
      params.priceMin,
      params.priceMax,
      params.gender,
      params.languages,
      params.hobbies
    ).subscribe(
      (response) => {
        this.guideFilterService.setGuideResult(response);
      },
      (error: any) => {
        console.error('Error al filtrar guías:', error);
      }
    );
  }
}
