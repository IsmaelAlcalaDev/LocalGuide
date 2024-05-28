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
  isAdmin: boolean = false;
  url: string = '';
  
  constructor(private router: Router, private authService: AuthService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.url = this.router.url;
    this.isAdmin = this.url.includes('admin');
    this.getUserTypeFromSessionStorage();
    this.userData = this.utilService.getDataUser();
    if (this.userData) {
      this.typeUser = this.userData.typeUser;
      this.profileImg = this.userData.profileImg ? this.userData.profileImg : 'assets/images/default-profile.png';
    } else {
      this.typeUser = 'public';
      this.profileImg = 'assets/images/default-profile.png';
    }
  }

  getUserTypeFromSessionStorage(): void {
    this.authService.UserType.subscribe(userType => {
      this.typeUser = userType;
      this.typeUser$.next(userType);
    });
  }
  
  logOut(): void {
    this.authService.logOut();
  }
}
