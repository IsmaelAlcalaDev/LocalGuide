import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../utilServices/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userType$ = new BehaviorSubject<string>('public');

  constructor(private utilService: UtilService) {
    // Obtener el tipo de usuario inicialmente
    const userData = this.utilService.getDataUser();
    const userType = userData?.typeUser || 'public';
    this.setUserType(userType); // Emite el valor inicial
  }

  get UserType() {
    return this.userType$.asObservable();
  }

  setUserType(userType: string) {
    // Actualizar el tipo de usuario y notificar a los observadores
    this.userType$.next(userType);
  }
}
