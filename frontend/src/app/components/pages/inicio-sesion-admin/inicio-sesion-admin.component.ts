import { Component } from '@angular/core';
import { ValidacionService } from '../../../services/validacionServices/validacion.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authServices/auth.service';
import { FormGroup } from '@angular/forms';
import { AdministradorService } from '../../../services/administradorService/administrador.service';


@Component({
  selector: 'app-inicio-sesion-admin',
  templateUrl: './inicio-sesion-admin.component.html',
  styleUrl: './inicio-sesion-admin.component.scss'
})
export class InicioSesionAdminComponent {
  loginForm!: FormGroup;
  email?: string;
  showErrorMessage: String = '';
  url: string = '';

  constructor(
    private validacionService: ValidacionService,
    private router: Router,
    private adminService: AdministradorService
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

      if (this.url === '/admin') {
        this.adminService.login(email, password).subscribe(
          (response) => {
            if (response) {
              sessionStorage.setItem('user', JSON.stringify(response));
              this.router.navigate(['/admin-dashboard']);
            }
          },
          (error) => {
            this.showErrorMessage = 'Usuario o contraseña incorrectos.';
          }
        );
      }
    } else {
      this.validacionService.setFormErrorsLogin(this.loginForm);
      this.showErrorMessage = 'Por favor, rellena los campos correctamente.';
    }
  }
}
