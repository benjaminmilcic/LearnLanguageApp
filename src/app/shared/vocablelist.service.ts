import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MyVocable } from './vocable.model';

@Injectable({
  providedIn: 'root'
})
export class VocablelistService {

  vocableList: MyVocable[] = [];
  vocableListSubject = new BehaviorSubject<number>(0);
}
