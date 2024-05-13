import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  languages: string[] = [
    "Inglés",
    "Español",
    "Mandarín",
    "Hindi",
    "Árabe",
    "Bengalí",
    "Portugués",
    "Ruso",
    "Japonés",
    "Alemán",
    "Francés",
    "Punjabi",
    "Javanés",
    "Wu",
    "Telugu",
    "Marathi",
    "Turco",
    "Tamil",
    "Urdu",
    "Vietnamita"
];

  constructor() {}

  getIdiomas() {
    return this.languages;
  }

}
