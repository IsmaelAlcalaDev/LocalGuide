import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../utilServices/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  utilService = inject(UtilService);
  private userType = this.utilService.getDataUser() ? JSON.parse(sessionStorage.getItem('user')!).typeUser : 'public';
  private userType$ = new BehaviorSubject<string>(this.userType);


  constructor() { }

  get UserType() {
    console.log(JSON.parse(sessionStorage.getItem('user')!))
    console.log(this.userType)
    return this.userType$.asObservable();
  }

  setUserType(userType: string) {
    this.userType$.next(userType);
  }
}
