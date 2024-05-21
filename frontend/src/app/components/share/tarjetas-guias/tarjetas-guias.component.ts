import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjetas-guias',
  templateUrl: './tarjetas-guias.component.html',
  styleUrl: './tarjetas-guias.component.scss'
})
export class TarjetasGuiasComponent {
  topRatedGuides: any[] = []; // Lista completa de guías
  guideSubscription: Subscription | undefined;
  
  constructor(private guiaService: GuiaService) { }

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

  showGuide(guide: any): void {
    console.log('Detalles del guía:', guide);
  }
}