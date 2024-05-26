import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guide } from '../../models/guide.model';


@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  private apiUrl = environment.apiUrls;
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  constructor(private http: HttpClient) { }

  registerGuide(guide: Guide): Observable<any> {
    return this.http.post<any>(this.apiUrl.guide.create, guide);
  }

  login(email: string, password: string): Observable<any> {
    // Definir los parámetros de la solicitud
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    // Realizar la solicitud POST con los parámetros
    return this.http.post<any>(this.apiUrl.guide.login, {}, { params: params });
  }

  updateGuide(guide: Guide, id:any): Observable<any> {
    const path = `${this.apiUrl.guide.update}/${id}`;
    return this.http.put<any>(path, guide, {headers:this.headerDict});
  }

  getTopRatedGuides(): Observable<any> {
    return this.http.get<any>(this.apiUrl.guide.topRated);
  }

  getGuideDetails(id: number): Observable<Guide> {
    const path = `${this.apiUrl.guide.detailGuide}/${id}`;
    return this.http.get<Guide>(path);
  }

  getGuides(): Observable<any> {
    return this.http.get<any>(this.apiUrl.guide.listGuides);
  }


  guiasInput: any = [
    {
      nombre: 'Juan',
      ubicacion: 'Sevilla, España',
      imagen: 'assets/images/perfil-juan.png',
      precio: '20€/h',
      descripcion: 'Soy un guía turístico con más de 5 años de experiencia en la ciudad de Sevilla. Me encanta compartir mi conocimiento sobre la historia y la cultura de esta hermosa ciudad.',
      cantidadResenas: 120,
      valoracion: 3
    },
    {
      nombre: 'María',
      ubicacion: 'Barcelona, España',
      imagen: 'assets/images/perfil-maria.png',
      precio: '25€/h',
      descripcion: '¡Hola! Soy María, una apasionada de la arquitectura modernista de Barcelona. Estoy aquí para mostrarte los rincones más bellos.',
      cantidadResenas: 95,
      valoracion: 4
    },
    {
      nombre: 'Carlos',
      ubicacion: 'Madrid, España',
      imagen: 'assets/images/perfil-carlos.png',
      precio: '18€/h',
      descripcion: 'Descubre la vibrante ciudad de Madrid conmigo. Como guía turístico local, te llevaré a los lugares más emblemáticos y te contaré historias fascinantes sobre esta ciudad llena de vida.',
      cantidadResenas: 80,
      valoracion: 5
    },
    {
      nombre: 'Laura',
      ubicacion: 'Valencia, España',
      imagen: 'assets/images/perfil-laura.png',
      precio: '22€/h',
      descripcion: '¡Bienvenidos a Valencia! Soy Laura, una guía turística con pasión por la historia y la gastronomía. Déjame mostrarte los tesoros ocultos y los sabores únicos de esta hermosa ciudad.',
      cantidadResenas: 110,
      valoracion: 4
    },
    {
      nombre: 'Pedro',
      ubicacion: 'Granada, España',
      imagen: 'assets/images/perfil-pedro.png',
      precio: '30€/h',
      descripcion: 'Hola, soy Ana, una apasionada de la cultura andaluza y la naturaleza. Como guía turística en Málaga, te llevaré a explorar los encantos de esta hermosa región, desde las playas hasta las montañas.',
      cantidadResenas: 150,
      valoracion: 4
    },
    {
      nombre: 'Ana',
      ubicacion: 'Málaga, España',
      imagen: 'assets/images/perfil-ana.png',
      precio: '23€/h',
      descripcion: 'Hola, soy Ana, una apasionada de la cultura andaluza y la naturaleza. Como guía turística en Málaga, te llevaré a explorar los encantos de esta hermosa región, desde las playas hasta las montañas.',
      cantidadResenas: 85,
      valoracion: 5
    }
  ];

  reservasRecientes: any = [
    {
      guia: "Javier",
      turista: "Ana Martínez",
      resena: "Excelente tour, muy informativo y entretenido. ¡Lo recomiendo totalmente!",
      valoracion: 5,
      ciudad: "Barcelona",
      pais: "España",
      imgCiudad: "barcelona.jpg",
      imgTurista: "ana_martinez.jpg",
      imgGuia: "javier_garcia.jpg"
    },
    {
      guia: "Maria",
      turista: "Pedro López",
      resena: "Maria es una guía fantástica, nos dio una experiencia increíble en Madrid.",
      valoracion: 4,
      ciudad: "Madrid",
      pais: "España",
      imgCiudad: "madrid.jpg",
      imgTurista: "pedro_lopez.jpg",
      imgGuia: "maria_rodriguez.jpg"
    },
    {
      guia: "Laura",
      turista: "Carlos Pérez",
      resena: "Laura fue muy atenta y conocedora. Disfrutamos mucho nuestra visita a Roma.",
      valoracion: 5,
      ciudad: "Roma",
      pais: "Italia",
      imgCiudad: "roma.jpg",
      imgTurista: "carlos_perez.jpg",
      imgGuia: "laura_fernandez.jpg"
    },
    {
      guia: "Juan",
      turista: "Sofía García",
      resena: "Juan nos llevó a lugares increíbles en París. Fue una experiencia maravillosa.",
      valoracion: 4,
      ciudad: "París",
      pais: "Francia",
      imgCiudad: "paris.jpg",
      imgTurista: "sofia_garcia.jpg",
      imgGuia: "juan_martinez.jpg"
    },
    {
      guia: "Carlos",
      turista: "Elena López",
      resena: "Carlos fue un excelente guía, nos llevó a los mejores lugares de Londres.",
      valoracion: 5,
      ciudad: "Londres",
      pais: "Reino Unido",
      imgCiudad: "londres.jpg",
      imgTurista: "elena_lopez.jpg",
      imgGuia: "carlos_sanchez.jpg"
    },
    {
      guia: "Ana",
      turista: "David García",
      resena: "Ana nos dio una experiencia increíble en Amsterdam. Muy recomendada.",
      valoracion: 4,
      ciudad: "Amsterdam",
      pais: "Países Bajos",
      imgCiudad: "amsterdam.jpg",
      imgTurista: "david_garcia.jpg",
      imgGuia: "ana_gomez.jpg"
    }
  ];

  // Método para simular la obtención de reseñas paginadas
  getReviews(page: number, pageSize: number): Observable<any> {
    // Supongamos que tenemos algunas reseñas de ejemplo
    const reviews = [
      { id: 1, name: 'Usuario 1', date: '2024-04-25', content: 'Excelente servicio', rating: 5, profileImage: '../../../assets/images/perfil-turista.png' },
      { id: 2, name: 'Usuario 2', date: '2024-04-24', content: 'Buena experiencia', rating: 4, profileImage: '../../../assets/images/perfil-turista.png' },
      { id: 3, name: 'Usuario 3', date: '2024-04-23', content: 'Podría mejorar', rating: 3, profileImage: '../../../assets/images/perfil-turista.png' },
      { id: 4, name: 'Usuario 4', date: '2024-04-22', content: 'No recomendado', rating: 2, profileImage: '../../../assets/images/perfil-turista.png' },
      { id: 5, name: 'Usuario 5', date: '2024-04-21', content: 'Muy malo', rating: 1, profileImage: '../../../assets/images/perfil-turista.png' }
    ];


    // Simular paginación de datos
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    // Simular respuesta del servidor
    return of({
      reviews: paginatedReviews,
      totalItems: reviews.length
    });
  }

}
