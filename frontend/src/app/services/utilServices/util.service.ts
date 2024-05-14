import { Injectable } from '@angular/core';
import { Tourist } from '../../models/tourist.model';
import { Guide } from '../../models/guide.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
userData: any = {};

  constructor() { }

  getDataUser(): Tourist | Guide | null {
    const userDataString = sessionStorage.getItem('user');
    
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null; // O cualquier otro valor por defecto que quieras manejar si no hay datos de usuario
  }
}

