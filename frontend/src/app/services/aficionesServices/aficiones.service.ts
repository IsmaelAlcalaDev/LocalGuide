import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AficionesService {

  hobbies: string[] = [
    "Deportes",
    "Cultura",
    "Gastronomía",
    "Naturaleza",
    "Fiesta",
    "Compras",
    "Religión",
    "Historia",
    "Arte",
    "Música",
    "Tecnología",
    "Cine",
    "Literatura",
    "Moda",
    "Viajes",
    "Animales",
    "Ciencia",
    "Política",
    "Economía",
    "Salud",
    "Educación",
    "Ecología",
    "Otros"
  ];

  constructor() { }

  getHobbies() {
    return this.hobbies;
  }
}
