import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { MyVocable } from 'src/app/shared/vocable.model';
import { VocablelistService } from 'src/app/shared/vocablelist.service';

@Component({
  selector: 'app-practice-options',
  templateUrl: './practice-options.component.html',
  styleUrls: ['./practice-options.component.css']
})
export class PracticeOptionsComponent implements OnInit, OnDestroy {

  panelOpenState = false;
  vocableList: MyVocable[];
  loadedVocableList: MyVocable[];
  categorySelectedSubscription: Subscription;
  @ViewChild('vocables') vocables: MatSelectionList;
  selectedOptions: MatSelectionList;
  selectedCategoryName: string;
  existVocableListToLoad: boolean;

  constructor(private databaseService: DatabaseService, public vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(() => {
      this.vocableList = this.vocablelistService.vocableList;
      this.existVocableListToLoad = false;
      if (localStorage.getItem('vocableList' + this.vocablelistService.selectCategoryIndex) != null) {
        this.existVocableListToLoad = true;
        this.loadedVocableList = JSON.parse(localStorage.getItem('vocableList' + this.vocablelistService.selectCategoryIndex));
      }
      this.selectedCategoryName = this.vocablelistService.getSelectedCategoryName();
    });
  }

  ngOnDestroy(): void {
    this.categorySelectedSubscription.unsubscribe();
  }

  onSaveVocableList() {
    this.existVocableListToLoad = true;
    localStorage.setItem('vocableList' + this.vocablelistService.selectCategoryIndex, JSON.stringify(this.vocableList));
    this.loadedVocableList = JSON.parse(localStorage.getItem('vocableList' + this.vocablelistService.selectCategoryIndex));
  }

  onLoadVocableList() {
    this.vocableList = this.loadedVocableList.slice();
    this.vocablelistService.loadVocableListSubject.next(this.vocableList);
  }

  onResetVocableList() {
    this.vocableList = this.vocablelistService.fullVocableList.slice();
    this.vocablelistService.loadVocableListSubject.next(this.vocableList);
  }
}