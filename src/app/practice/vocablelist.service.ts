import { Injectable } from '@angular/core';
import { MyVocable } from '../shared/vocable.model';

@Injectable({
  providedIn: 'root'
})
export class VocablelistService {

vocableList: MyVocable[] = [];
}
