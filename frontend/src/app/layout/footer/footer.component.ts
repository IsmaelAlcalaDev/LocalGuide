import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isAdmin: boolean = false;
  url: string = '';

  constructor( private router: Router) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.isAdmin = this.url.includes('admin');
  }
}
