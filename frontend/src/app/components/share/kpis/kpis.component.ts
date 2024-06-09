import { Component } from '@angular/core';
import { AdministradorService } from '../../../services/administradorService/administrador.service';

@Component({
  selector: 'app-kpis',
  templateUrl: './kpis.component.html',
  styleUrl: './kpis.component.scss'
})
export class KpisComponent {

  totalBillingYears?: number;
  totalBillingMonths?: number;
  totalReservations?: number;
  totalReservationsMonths?: number;
  totalUsers?: number;
  mostVisitedCountry?: string;
  actualDate?: Date;
  indexMonth?: number;
  actualMonth?: string;
  actualYear?: number;
  month: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.getKpis();
    this.actualDate = new Date();
    this.indexMonth = this.actualDate.getMonth();
    this.actualMonth = this.month[this.indexMonth];
    this.actualYear = this.actualDate.getFullYear();
  }

  getKpis(): void {
    this.administradorService.getKpis().subscribe(
      (response) => {
        this.totalBillingYears = response.totalTransactionsYearToDate;
        this.totalBillingMonths = response.totalTransactionsCurrentMonth;
        this.totalReservations = response.totalAcceptedReservations;
        this.totalReservationsMonths = response.totalAcceptedReservationsCurrentMonth;
        this.totalUsers = response.totalUsers;
        this.mostVisitedCountry = response.mostReservedCountryByGuide;
      },
      error => {
        console.error('Error al cargar los KPIs', error);
      }
    );
  }
}
