import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { MyVocable } from 'src/app/shared/vocable.model';
import { VocablelistService } from 'src/app/shared/vocablelist.service';

@Component({
  selector: 'app-practice-options',
  templateUrl: './practice-options.component.html',
  styleUrls: ['./practice-options.component.css']
})
export class PracticeOptionsComponent implements OnInit, OnDestroy, AfterViewInit {

  panelOpenState = false;
  vocableList: MyVocable[];
  fullVocableList: MyVocable[];
  categorySelectedSubscription: Subscription;
  @ViewChild('vocables') vocables: MatSelectionList;
  selectedOptions: MatSelectionList;

  constructor(private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(() => {
      this.vocableList = this.vocablelistService.vocableList;
      this.fullVocableList = this.vocablelistService.fullVocableList;
    });
  }

  ngAfterViewInit(): void {
    this.vocables.selectAll();
  }

  ngOnDestroy(): void {
    this.categorySelectedSubscription.unsubscribe();
  }
}
