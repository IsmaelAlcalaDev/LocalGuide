import { Component } from '@angular/core';
import { GuiaService } from '../../../services/guiaService/guia.service';

@Component({
  selector: 'app-resenas-guia',
  templateUrl: './resenas-guia.component.html',
  styleUrl: './resenas-guia.component.scss'
})
export class ResenasGuiaComponent {
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
