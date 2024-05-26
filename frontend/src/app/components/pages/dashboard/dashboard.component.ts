import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  componentToShow: string = 'kpis';

  constructor( private router: Router) {}

  ngOnInit(): void {
    this.showComponent('kpis'); 
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/inicio']);
  }

  showComponent(componentName: string): void {
    this.componentToShow = componentName;
  }
}
