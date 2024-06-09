import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-guias',
  templateUrl: './tarjetas-guias.component.html',
  styleUrls: ['./tarjetas-guias.component.scss']
})
export class TarjetasGuiasComponent {
  topRatedGuides: any[] = [];
  guideSubscription: Subscription | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private guiaService: GuiaService, private router: Router) { }

  ngOnInit(): void {
    this.getTopRatedGuides();
  }

  getTopRatedGuides(): void {
    this.guideSubscription = this.guiaService.getTopRatedGuides().subscribe(
      (guides: any) => {
        this.topRatedGuides = guides;
      },
      (error: any) => {
        console.error('Error al obtener la lista de guías:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.guideSubscription) {
      this.guideSubscription.unsubscribe();
    }
  }

  getPaginatedGuides(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.topRatedGuides.slice(startIndex, endIndex);
  }

  showGuide(idGuide: any): void {
    this.router.navigate(['/perfil-guia', idGuide]);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
