import { Component } from '@angular/core';
import { ReservaService } from '../../../services/reservaService/reserva.service';

@Component({
  selector: 'app-reservas-recientes',
  templateUrl: './reservas-recientes.component.html',
  styleUrl: './reservas-recientes.component.scss'
})
export class ReservasRecientesComponent {
  recentReservation: any = [];
  imageCity: { [city: string]: string } = {};

  constructor(private reservationService: ReservaService) { }

  ngOnInit(): void {
    this.getRecentReservations();
  }

  getRecentReservations(): void {
    this.reservationService.getRecentReservation().subscribe(
      (data) => {
        this.recentReservation = data;
        this.recentReservation.forEach((reserva: any) => {
          this.getImageCountryBackground(reserva.city);
        });
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  getImageCountryBackground(city: string): void {
    this.getImageCountry(city).then(url => {
      this.imageCity[city] = url as string;
    });
  }

  async getImageCountry(city: string) {
    let imgUrl = '';
    try {
      // Construir la URL de la solicitud a la API de Pixabay para buscar imágenes del país
      const url = `https://pixabay.com/api/?key=43614702-f563ffcec30536bb1af0571ea&q=${city}&image_type=photo`;

      // Realizar la solicitud a la API de Pixabay
      const response = await fetch(url);
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.hits.length);
      // Obtener la URL de la primera imagen encontrada
      imgUrl = data.hits[randomIndex].largeImageURL;

      // Devolver la URL de la imagen
      return imgUrl;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      return null;
    }
  }
}
