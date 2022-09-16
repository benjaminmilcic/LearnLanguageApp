import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../shared/database.service';
import { VocablelistService } from '../shared/vocablelist.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit, OnDestroy {

  vocableListSubscription: Subscription;


  constructor(public databaseService: DatabaseService,
    private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.vocableListSubscription = this.vocablelistService.vocableListSubject.subscribe(index => {
      this.vocablelistService.vocableList = this.databaseService.getVocableList(index);
      this.vocablelistService.vocableList.splice(2, this.vocablelistService.vocableList.length - 2);
    });
  }


  ngOnDestroy() {
    this.vocableListSubscription.unsubscribe();
  }
}
