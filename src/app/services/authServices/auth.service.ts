import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../utilServices/util.service';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userType$ = new BehaviorSubject<string>('public');
  private supabase = createClient(
    import.meta.env['VITE_SUPABASE_URL'],
    import.meta.env['VITE_SUPABASE_ANON_KEY']
  );

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
    this.supabase.auth.signOut().then(() => {
      this.router.navigate(['/inicio']);
    });
  }

  logOutAdmin(): void {
    this.setUserType('public');
    sessionStorage.clear();
    this.supabase.auth.signOut();
  }

  getUserType(): string {
    return this.userType$.value;
  }
}