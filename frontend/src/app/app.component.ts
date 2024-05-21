import { Component } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Local Guide';

  ngOnInit() {
    AOS.init();
  }
}


