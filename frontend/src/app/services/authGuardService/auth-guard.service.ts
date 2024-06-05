import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../authServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as string[];
    const userType = this.authService.getUserType();

    if (!expectedRoles.includes(userType)) {
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }
}
