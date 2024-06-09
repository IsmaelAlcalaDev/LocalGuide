import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authServices/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  componentToShow: string = 'kpis';
  userData: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.showComponent('kpis');
  }

  logOut(): void {
    this.authService.logOutAdmin();
  }

  showComponent(componentName: string): void {
    this.componentToShow = componentName;
  }
}
