import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { TuristaService } from '../../../services/turistaService/turista.service';
import { AuthService } from '../../../services/authServices/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;
  url?: string;
  email?: string;
  showErrorMessage: String = '';

  constructor(
    private validacionService: ValidacionService,
    private guiaService: GuiaService,
    private turistaService: TuristaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;  
    this.loginForm = this.validacionService.validateLogin();
    this.autocompleteEmail();
  }

  autocompleteEmail(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.loginForm.get('email')?.setValue(email);
    }
    localStorage.removeItem('email');
  }

  iniciarSesion() {

    if (this.loginForm && this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (this.url === '/inicio-sesion-guia') {
        this.guiaService.login(email, password).subscribe(
          response => {
            const userData = response;
            sessionStorage.setItem('user', JSON.stringify(userData));
            this.authService.setUserType(userData.typeUser);
            this.router.navigate(['/inicio']);
          },
          error => {
            console.error('Error al iniciar sesión:', error); 
            if (error.status === 404 || error.status === 401) {
              this.showErrorMessage = 'Usuario o contraseña incorrectos';
            }
          }
        );  
      } else if (this.url === '/inicio-sesion-turista') {
        this.turistaService.login(email, password).subscribe(
          response => {
            const userData = response;
            sessionStorage.setItem('user', JSON.stringify(userData));
            this.authService.setUserType(userData.typeUser);
            this.router.navigate(['/inicio']);
          },
          error => {
            console.error('Error al iniciar sesión:', error); 
            if (error.status === 404 || error.status === 401) {
              this.showErrorMessage = 'Usuario o contraseña incorrectos';
            }
          }
        );
      }
    } else {
      this.validacionService.setFormErrorsLogin(this.loginForm);
      this.showErrorMessage = 'Por favor, rellena los campos correctamente.';
    }
  }
  
}
