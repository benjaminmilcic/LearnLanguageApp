import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../shared/database.service';
import { VocablelistService } from '../../shared/vocablelist.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit, OnDestroy {

  categorySelectedSubscription: Subscription;

  constructor(public databaseService: DatabaseService,
    private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(index => {
      this.vocablelistService.vocableList = this.databaseService.getVocableList(index);
      this.vocablelistService.fullVocableList = this.databaseService.getVocableList(index);

      // this code ist for testing... it reduces the vocableList to 2 Elements
      // this.vocablelistService.vocableList.splice(2, this.vocablelistService.vocableList.length - 2);
    });
  }

  ngOnDestroy() {
    this.categorySelectedSubscription.unsubscribe();
  }
}
