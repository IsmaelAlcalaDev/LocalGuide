import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authServices/auth.service';
import { UtilService } from '../../services/utilServices/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userType?: string;
  profileImg?: string;
  userData: any = {};

  constructor(private router: Router, private authService: AuthService, private utilService: UtilService) { }

  ngOnInit() {
    this.userData = this.utilService.getDataUser();
    this.getUserTypeFromSessionStorage();
    this.profileImg = this.userData.profileImg ? this.userData.profileImg : 'assets/images/default-profile.png'; 
  }

  getUserTypeFromSessionStorage() {
    this.authService.UserType.subscribe(userType => {
      this.userType = userType;
    });
  }
  
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/inicio']);
    this.userType = 'public';
  }
}
