import { Component } from '@angular/core';
import { AuthService } from '../../../services/authServices/auth.service';

@Component({
  selector: 'app-configuracion-perfil',
  templateUrl: './configuracion-perfil.component.html',
  styleUrl: './configuracion-perfil.component.scss'
})
export class ConfiguracionPerfilComponent {
  userType?: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserTypeFromSessionStorage();
  }

  getUserTypeFromSessionStorage() {
    this.authService.UserType.subscribe(userType => {
      this.userType = userType;
    });
  }
}
