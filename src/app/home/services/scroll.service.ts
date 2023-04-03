import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollSubject = new BehaviorSubject<any>(null);
  showNav:boolean = true;

  constructor() { }


  setScrollDetails(details:any){
    this.scrollSubject.next(details);
  }


}
