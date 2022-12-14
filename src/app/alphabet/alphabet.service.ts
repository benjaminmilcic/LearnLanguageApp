import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  selectedLetterSubject = new BehaviorSubject<number>(0);
  
}
