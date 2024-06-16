import { Component } from '@angular/core';
import { GuideFilterService } from '../../../services/guideFilterService/guide-filter.service';
import { Router } from '@angular/router';
import { MediaService } from '../../../services/mediaService/media.service';

@Component({
  selector: 'app-tarjetas-guias-filtrados',
  templateUrl: './tarjetas-guias-filtrados.component.html',
  styleUrl: './tarjetas-guias-filtrados.component.scss'
})
export class TarjetasGuiasFiltradosComponent {
  listGuides: any = [];
  imagesCountry: { [key: string]: string } = {};
  message: string = "No se han encontrado guías con los filtros seleccionados";
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private guideFilterService: GuideFilterService, private router: Router, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.guideFilterService.guideResult$.subscribe(result => {
      this.listGuides = result;
    });
    this.mediaService.getCountriesImages().subscribe(data => {
      this.imagesCountry = data;
    });
  }

  showGuide(idGuide: any): void {
    this.router.navigate(['/perfil-guia', idGuide]);
  }

  getPaginatedGuides(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listGuides.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

}
