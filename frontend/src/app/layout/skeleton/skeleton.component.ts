import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

  isAdmin: boolean = false;
  url: string = '';

  constructor( private router: Router) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.isAdmin = this.url.includes('admin');
  }

}
