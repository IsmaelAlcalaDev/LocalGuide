import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../utilServices/util.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userType$ = new BehaviorSubject<string>('public');

  constructor(private utilService: UtilService, private router: Router) {

    const userData = this.utilService.getDataUser();
    const userType = userData?.typeUser || 'public';
    this.setUserType(userType); 
  }

  get UserType() {
    return this.userType$.asObservable();
  }

  setUserType(userType: string) {
    this.userType$.next(userType);
  }

  logOut(): void {
    this.setUserType('public');
    sessionStorage.clear();
    this.router.navigate(['/inicio']);
  }

  logOutAdmin(): void {
    this.setUserType('public');
    sessionStorage.clear();
  }
}
