import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideFilterService {

  private guideResultSource = new BehaviorSubject<any>([]);
  guideResult$ = this.guideResultSource.asObservable();

  constructor() { }

  setGuideResult(result: any) {
    this.guideResultSource.next(result);
    console.log('Result:', result);
  }
}
