import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-resenas-turista',
  templateUrl: './resenas-turista.component.html',
  styleUrl: './resenas-turista.component.scss'
})
export class ResenasTuristaComponent {
  reviews: any[] = [];
  totalItems?: number;
  pageSize = 4;
  currentPage = 1;

  constructor(private guiaService : GuiaService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.guiaService.getReviews(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.reviews = data.reviews;
        this.totalItems = data.totalItems;
      });
  }

  onPageChange(event: { pageIndex: number; }): void {
    this.currentPage = event.pageIndex + 1;
    this.loadReviews();
  }
}
