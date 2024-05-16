import { Component, inject } from '@angular/core';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import { FormGroup } from '@angular/forms';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { IdiomaService } from '../../../services/idiomaService/idioma.service';
import { AficionesService } from '../../../services/aficionesServices/aficiones.service';

import { Guide} from '../../../models/guide.model';
import { UtilService } from '../../../services/utilServices/util.service';

@Component({
  selector: 'app-configuracion-guia',
  templateUrl: './configuracion-guia.component.html',
  styleUrl: './configuracion-guia.component.scss'
})
export class ConfiguracionGuiaComponent {
  updateForm!: FormGroup;
  userData: any = {};
  countries: string[] = [];
  selectedCountry: string = '';
  cities: { [key: string]: string[] } = {};
  phonePrefixes: { [key: string]: string } = {};
  phonePrefix: string = '+1';
  hide: boolean = true;
  message: string = '';
  messageError: string = '';
  profileImg?: string;
  languages: string[] = [];
  hobbies: string[] = [];
  phrase: string = '';
  additionalInfo: string = '';
  profileImgBase64: string | null = null;
  existBackgroundCheckCertificate: Boolean = false;
  existIdentityDocument: Boolean = false;

  constructor(
    private validacionService: ValidacionService,
    private ubicacionService: UbicacionService,
    private guiaService: GuiaService,
    private idiomaService: IdiomaService,
    private aficionesService: AficionesService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.userData = this.utilService.getDataUser();
    console.log(this.userData);
    this.updateForm = this.validacionService.validateUpdateFormGuide(this.userData);
    this.chargeJsonLocation();
    this.changeCityAndPrefix();
    this.profileImg = this.userData.profileImg ? this.userData.profileImg : 'assets/images/default-profile.png';  
    this.languages = this.chargeJsonLanguages(); 
    this.hobbies = this.chargueJsonHobbies();
    this.changeStateCertificate();
  }

  changeStateCertificate() {
    if (this.userData.backgroundCheckCertificate) {
      this.existBackgroundCheckCertificate = true;
    }
    if (this.userData.identityDocument) {
      this.existIdentityDocument = true;
    }
  }

  chargeJsonLanguages(): string[] {
    return this.idiomaService.getIdiomas();
  }

  chargueJsonHobbies(): string[] {
    return this.aficionesService.getHobbies();
  }

  chargeJsonLocation() {
    this.ubicacionService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.ubicacionService.getCities().subscribe(cities => {
      this.cities = cities;
    });
    this.ubicacionService.getPhonePrefixes().subscribe(prefixes => {
      this.phonePrefixes = prefixes;
    });
  }

  changeCityAndPrefix() {
    if (this.userData) {
      this.selectedCountry = this.userData.country;
      this.phonePrefix = this.phonePrefixes[this.selectedCountry];
    }
    this.updateForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedCountry = country;
      this.phonePrefix = this.phonePrefixes[country];
    });
  }

  checkLanguage(lng: string): boolean {
    const languages = this.userData.languages as string[]; // Suponiendo que userData.languages es un array de strings
    return languages.includes(lng);
  }

  checkHobbies(hobb: string): boolean {
      const hobbies = this.userData.hobbies as string[]; // Suponiendo que userData.hobbies es un array de strings
      return hobbies.includes(hobb);
  }

  onLanguageChange(checked: boolean, language: string) {
    const user = this.userData;
    const languages = user.languages;

    if (checked) {
        if (!languages.includes(language)) {
            languages.push(language);
        }
    } else {
        const index = languages.indexOf(language);
        if (index !== -1) {
            languages.splice(index, 1);
        }
    }

    // Actualiza los datos del usuario y guarda en el almacenamiento de sesión
    user.languages = languages;
    sessionStorage.setItem('user', JSON.stringify(this.userData));
  }

  onHobbiesChange(checked: boolean, hobby: string) {
    const user = this.userData;
    const hobbies = user.hobbies;

    if (checked) {
        if (!hobbies.includes(hobby)) {
            hobbies.push(hobby);
        }
    } else {
        const index = hobbies.indexOf(hobby);
        if (index !== -1) {
            hobbies.splice(index, 1);
        }
    }

    // Actualiza los datos del usuario y guarda en el almacenamiento de sesión
    user.hobbies = hobbies;
    sessionStorage.setItem('user', JSON.stringify(this.userData));
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImgBase64 = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onCertificateSelected(event: any): void {
    const file: File = event.target.files[0];
    if(file){
      this.existBackgroundCheckCertificate = true;
    }
  }

  onIdentityDocumentSelected(event: any): void {
    const file: File = event.target.files[0];
    if(file){
      this.existIdentityDocument = true;
    }
  }

  updateGuide(): void {
    if (this.updateForm && this.updateForm.valid) {
    const guide: Guide = {
      name: this.updateForm.value.name,
      surname: this.updateForm.value.surname,
      email: this.updateForm.value.email,
      password: this.updateForm.value.password === '' ? this.userData.password : this.updateForm.value.password,
      country: this.updateForm.value.country,
      city: this.updateForm.value.city,
      phone: this.updateForm.value.phone,
      gender: this.updateForm.value.gender,
      phrase: this.updateForm.value.phrase,
      additionalInfo: this.updateForm.value.additionalInfo,
      languages: this.updateForm.value.languages,
      hobbies: this.updateForm.value.hobbies,
      hourlyPrice: parseInt(this.updateForm.value.hourlyPrice),
      profileImg: this.profileImgBase64 ? this.profileImgBase64: this.userData.profileImage,
      backgroundCheckCertificate: this.existBackgroundCheckCertificate as boolean | undefined,
      identityDocument: this.existIdentityDocument as boolean | undefined,
    }
    console.log(guide)
    this.guiaService.updateGuide(guide, this.userData.id).subscribe(
      response => {
        console.log(response)
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(response));
        this.updateForm.patchValue({
          password: '',
          matchPassword: ''
        });
        this.userData = this.utilService.getDataUser();
        this.profileImg = this.userData.profileImg;
        this.message = 'Usuario actualizado correctamente.';
        setTimeout(() => {
          this.message = '';
       window.location.reload();
        }, 3000);
      },
      error => {
        if (error.status === 409 || error.status === 401 || error.status === 403 || error.status === 404 || error.status === 500){
          this.messageError = 'Ha ocurrido un error inesperado.';
        }
        setTimeout(() => {
          this.messageError = ''; 
        //  window.location.reload();
        }, 3000); 
        }
    );
  }
  }
}
