import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { DatabaseService } from './database.service';
import { MyVocable } from './vocable.model';

@Injectable({
  providedIn: 'root'
})
export class VocablelistService implements OnInit, OnDestroy {

  vocableList: MyVocable[] = [];
  fullVocableList: MyVocable[] = [];
  categorySelectedSubject = new BehaviorSubject<number>(0);
  private categorySelectedSubscription: Subscription;
  selectCategoryIndex: number = 0;
  loadVocableListSubject = new Subject<MyVocable[]>;
  allDone: boolean = false;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.getSelectedCategoryName();
  }

  ngOnDestroy(): void {
    this.categorySelectedSubscription.unsubscribe();
  }

  setSelectCategoryIndex(index) {
    this.selectCategoryIndex = index;
  }

  getSelectedCategoryName() {
    return this.databaseService.getCategoyList()[this.selectCategoryIndex];
  }
}
