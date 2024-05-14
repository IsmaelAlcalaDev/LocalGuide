import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authServices/auth.service';
import { UtilService } from '../../services/utilServices/util.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  typeUser?: string;
  profileImg?: string;
  userData: any = {};
  typeUser$ = new BehaviorSubject<string>('public');

  constructor(private router: Router, private authService: AuthService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getUserTypeFromSessionStorage();
    this.userData = this.utilService.getDataUser();
    console.log('header:', this.userData);
    this.typeUser = this.userData.typeUser;
    this.profileImg = this.userData.profileImg ? this.userData.profileImg : 'assets/images/default-profile.png'; 
  }

  getUserTypeFromSessionStorage(): void {
    this.authService.UserType.subscribe(userType => {
      this.typeUser = userType;
      console.log('header:', userType);
      this.typeUser$.next(userType);
    });
  }
  
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/inicio']);
    this.typeUser = 'public';
  }
}
