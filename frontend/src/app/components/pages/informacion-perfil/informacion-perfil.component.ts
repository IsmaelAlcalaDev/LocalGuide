import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-perfil',
  templateUrl: './informacion-perfil.component.html',
  styleUrl: './informacion-perfil.component.scss'
})
export class InformacionPerfilComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    this.comprobarUrlInfoTurista();
  }

  comprobarUrlInfoTurista() {
    const url = this.router.url;
    if (url.includes('perfil-turista')) {
      return true;
    } else {
      return false;
    }
  }
}
