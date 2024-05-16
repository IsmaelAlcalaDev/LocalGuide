import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import { TuristaService } from '../../../services/turistaService/turista.service';
import { UtilService } from '../../../services/utilServices/util.service';

@Component({
  selector: 'app-configuracion-turista',
  templateUrl: './configuracion-turista.component.html',
  styleUrl: './configuracion-turista.component.scss'
})
export class ConfiguracionTuristaComponent {
  updateForm!: FormGroup;
  userData: any = {};
  countries: string[] = [];
  selectedCountry: string = '';
  cities: { [key: string]: string[] } = {};
  phonePrefixes: { [key: string]: string } = {};
  phonePrefix: string = '+1';
  hide: boolean = true;
  profileImg?: string;
  message: string = '';
  messageError: string = '';
  profileImgBase64: string = '';

  constructor(
    private validacionService: ValidacionService, 
    private ubicacionService: UbicacionService,
    private turistaService: TuristaService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.userData = this.utilService.getDataUser();
    this.updateForm = this.validacionService.validateUpdateFormTourist(this.userData);
    this.chargeJsonLocation();
    this.changeCityAndPrefix();
    this.profileImg = this.userData.profileImg ? this.userData.profileImg : 'assets/images/default-profile.png'; 
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
    if(this.userData){
      this.selectedCountry = this.userData.country;
      this.phonePrefix = this.phonePrefixes[this.selectedCountry];
    }
      this.updateForm.get('country')?.valueChanges.subscribe(country => {
        this.selectedCountry = country;
        this.phonePrefix = this.phonePrefixes[country];
      });
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImgBase64 = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  updateUser() {
      if (this.updateForm && this.updateForm.valid) {
        const usuario = {
          name: this.updateForm.get('name')?.value,
          surname: this.updateForm.get('surname')?.value,
          password: this.updateForm.get('password')?.value === '' ? this.userData.password : this.updateForm.get('password')?.value,
          country: this.updateForm.get('country')?.value,
          city: this.updateForm.get('city')?.value,
          phone: this.updateForm.get('phone')?.value,
          gender: this.updateForm.get('gender')?.value,
          email: this.updateForm.get('email')?.value,
          profileImg: this.profileImgBase64 ? this.profileImgBase64 : this.userData.profileImg,
        };

          this.turistaService.updateTourist(usuario).subscribe(
            response => {
              sessionStorage.removeItem('user');
              sessionStorage.setItem('user', JSON.stringify(response));
              this.updateForm.patchValue({
                password: '',
                matchPassword: ''
              });
              this.message = 'Usuario actualizado correctamente.';
              this.profileImg = this.userData.profileImg;
              setTimeout(() => {
                this.message = '';
                window.location.reload();
              }, 3000);
            },
            error => {
              if (error.status === 409) {
                this.messageError = 'El usuario ya está registrado.';
              }
              if(error.status === 400 || error.status === 500 || error.status === 401 || error.status === 403 || error.status === 404 || error.status === 409){
                this.messageError = 'Error al actualizar usuario.';
              }
              setTimeout(() => {
                this.messageError = '';
                window.location.reload();
              }, 3000);
            }
          );  
      }
    }

}
