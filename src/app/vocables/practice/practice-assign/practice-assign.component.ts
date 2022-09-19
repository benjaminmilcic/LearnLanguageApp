import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { MyVocable } from 'src/app/shared/vocable.model';
import { VocablelistService } from '../../../shared/vocablelist.service';

@Component({
  selector: 'app-practice-assign',
  templateUrl: './practice-assign.component.html',
  styleUrls: ['./practice-assign.component.css']
})
export class PracticeAssignComponent implements OnInit, OnDestroy {

  vocableList: MyVocable[] = [];
  croatianVocableList: string[] = [];
  germanVocableList: string[] = [];
  leftChip: MatChip = null;
  rightChip: MatChip = null;

  vocableListSubscription: Subscription;

  constructor(private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.vocableListSubscription = this.vocablelistService.vocableListSubject.subscribe(() => {
      this.vocableList = this.vocablelistService.vocableList;
      this.croatianVocableList = [];
      this.germanVocableList = [];
      for (let vocable = 0; vocable < this.vocableList.length; vocable++) {
        this.croatianVocableList.push(this.vocableList[vocable].croatian);
        this.germanVocableList.push(this.vocableList[vocable].german);
      }
      this.croatianVocableList.sort(() => 0.5 - Math.random());
      this.germanVocableList.sort(() => 0.5 - Math.random());
    });
  }

  toggleLeftSelection(chip: MatChip) {
    this.leftChip = chip;
    if (this.rightChip && this.rightChip.selected) {
      this.compareSelections();
    }
  }

  toggleRightSelection(chip: MatChip) {
    this.rightChip = chip;
    if (this.leftChip && this.leftChip.selected) {
      this.compareSelections();
    }
  }

  private compareSelections() {
    setTimeout(() => {
      this.leftChip.deselect();
      this.rightChip.deselect();
      for (let vocable = 0; vocable < this.vocableList.length; vocable++) {
        let croatian: string = this.leftChip.value;
        let german: string = this.rightChip.value;
        croatian = croatian.trim();
        german = german.trim();
        if (
          this.vocableList[vocable].croatian === croatian &&
          this.vocableList[vocable].german === german) {
          this.croatianVocableList.splice(
            this.croatianVocableList.indexOf(croatian),
            1);
          this.germanVocableList.splice(
            this.germanVocableList.indexOf(german),
            1);
          this.vocableList.splice(vocable, 1);
          break;
        }
      }
    }, 500);
  }

  ngOnDestroy() {
    this.vocableListSubscription.unsubscribe();
  }
}
