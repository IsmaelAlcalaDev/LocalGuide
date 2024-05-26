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

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.getKpis();
  }

  getKpis(): void {
    this.administradorService.getKpis().subscribe(
      (response) => {
        console.log(response);
        this.totalBillingYears = response.totalTransactionsYearToDate;
        this.totalBillingMonths = response.totalTransactionsCurrentMonth        ;
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
