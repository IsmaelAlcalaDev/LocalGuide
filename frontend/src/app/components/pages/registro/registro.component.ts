import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { TuristaService } from '../../../services/turistaService/turista.service';
import { UbicacionService } from '../../../services/ubicacionServices/ubicacion.service';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  url?: string;
  registerForm!: FormGroup;
  countries: string[] = [];
  selectedCountry: string = '';
  cities: { [key: string]: string[] } = {};
  phonePrefixes: { [key: string]: string } = {};
  phonePrefix: string = '+1';
  hide = true;
  message:string = '';
  profileImgBase64: string = '';

  constructor(
    private guiaService: GuiaService,
    private turistaService: TuristaService,
    private validacionService: ValidacionService,
    private ubicacionService: UbicacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.url = this.router.url;
    this.registerForm = this.validacionService.validateRegister();
    this.chargeJsonLocation();
    this.changeCityAndPrefix();
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImgBase64 = reader.result as string;
      console.log('Archivo convertido a Base64:', this.profileImgBase64);
    }
    reader.readAsDataURL(file);
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
    this.registerForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedCountry = country;
      this.phonePrefix = this.phonePrefixes[country];
    });
  }

  registerUser() {
    if (this.registerForm && this.registerForm.valid) {
      const usuario = {
        name: this.registerForm.get('name')?.value,
        surname: this.registerForm.get('surname')?.value,
        password: this.registerForm.get('password')?.value,
        country: this.registerForm.get('country')?.value,
        city: this.registerForm.get('city')?.value,
        phone: this.registerForm.get('phone')?.value,
        gender: this.registerForm.get('gender')?.value,
        email: this.registerForm.get('email')?.value,
        profileImg: this.profileImgBase64,
      };
      if(this.url === '/registro-guia'){
        this.guiaService.registerGuide(usuario).subscribe(
          response => {
            localStorage.setItem('email', response.email);
            this.router.navigate(['/inicio-sesion-guia']);
          },
          error => {
            console.error('Error al registrar usuario:', error);
            if (error.status === 409) {
              this.message = 'El usuario ya está registrado.';
            }
          }
        );  
      }else if(this.url === '/registro-turista'){
        this.turistaService.registerTourist(usuario).subscribe(
          response => {
            localStorage.setItem('email', response.email);
            this.router.navigate(['/inicio-sesion-turista']);
          },
          error => {
            console.error('Error al registrar usuario:', error);
            if (error.status === 409) {
              this.message = 'El usuario ya está registrado.';
            }
          }
        );
      }
    } else {
      this.message = 'Por favor, rellene todos los campos correctamente.';
    }
  }
  
}
