import { Component } from '@angular/core';
import { GuideFilterService } from '../../../services/guideFilterService/guide-filter.service';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  country: string = '';

  constructor(
    private guideService: GuiaService,
    private guideFilterService: GuideFilterService,
    private router: Router
  ) { }

  searchGuides() {
    const params = {
      guideName: null,
      country: this.country,
      city: null,
      priceMin: null,
      priceMax: null,
      gender: null,
      languages: [],
      hobbies: []
    };

    this.guideService.getGuideFilter(
      params.guideName,
      params.country,
      params.city,
      params.priceMin,
      params.priceMax,
      params.gender,
      params.languages,
      params.hobbies
    ).subscribe(
      (response) => {
        this.guideFilterService.setGuideResult(response);
        this.router.navigate(['/buscar-guia', { flag: true }]);
      },
      (error: any) => {
        console.error('Error al filtrar guías:', error);
      }
    );
  }
}
