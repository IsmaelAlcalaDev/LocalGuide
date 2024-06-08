import { Component } from '@angular/core';
import { GuideFilterService } from '../../../services/guideFilterService/guide-filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-guias-filtrados',
  templateUrl: './tarjetas-guias-filtrados.component.html',
  styleUrl: './tarjetas-guias-filtrados.component.scss'
})
export class TarjetasGuiasFiltradosComponent {
  listGuides: any = [];
  message: string = "No se han encontrado guías con los filtros seleccionados";
  currentPage: number = 1;
  itemsPerPage: number = 6; 

  constructor(private guideFilterService: GuideFilterService, private router: Router) {}

  ngOnInit(): void {
    this.guideFilterService.guideResult$.subscribe(result => {
      this.listGuides = result;
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
