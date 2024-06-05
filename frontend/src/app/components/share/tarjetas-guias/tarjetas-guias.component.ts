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
  topRatedGuides: any[] = []; // Lista completa de guías
  guideSubscription: Subscription | undefined;
  currentPage: number = 1; // Número de página actual
  itemsPerPage: number = 6; // Cantidad de elementos por página

  constructor(private guiaService: GuiaService, private router: Router) { }

  ngOnInit(): void {
    this.getTopRatedGuides();
  }

  getTopRatedGuides(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.guideSubscription = this.guiaService.getTopRatedGuides().subscribe(
      (guides: any) => {
        this.topRatedGuides = guides.slice(startIndex, endIndex);
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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getTopRatedGuides();
  }

  showGuide(idGuide: any): void {
    this.router.navigate(['/perfil-guia', idGuide]);
  }

  onPageBoundsCorrection(event: any): void {
    if (event.action === 'prev' && this.currentPage === 1) {
      this.currentPage = event.page;
      this.getTopRatedGuides();
    }
  }
}
