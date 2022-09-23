import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
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
  croatianChip: MatChip = null;
  germanChip: MatChip = null;

  categorySelectedSubscription: Subscription;

  constructor(private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(() => {
      this.getVocableList();
      this.emptyChipLists();
      this.fillChipLists();
      this.randomizeChipLists();
    });
  }

  private getVocableList() {
    this.vocableList = this.vocablelistService.vocableList;
  }

  private emptyChipLists() {
    this.croatianVocableList = [];
    this.germanVocableList = [];
  }

  private fillChipLists() {
    for (let vocableIndex = 0; vocableIndex < this.vocableList.length; vocableIndex++) {
      this.croatianVocableList.push(this.vocableList[vocableIndex].croatian);
      this.germanVocableList.push(this.vocableList[vocableIndex].german);
    }
  }

  private randomizeChipLists() {
    this.croatianVocableList.sort(() => 0.5 - Math.random());
    this.germanVocableList.sort(() => 0.5 - Math.random());
  }

  toggleCroatianListSelection(chip: MatChip) {
    this.croatianChip = chip;
    if (this.germanChip && this.germanChip.selected) {
      this.compareSelections();
    }
  }

  toggleGermanListSelection(chip: MatChip) {
    this.germanChip = chip;
    if (this.croatianChip && this.croatianChip.selected) {
      this.compareSelections();
    }
  }

  private compareSelections() {
    setTimeout(() => {

      for (let vocableIndex = 0; vocableIndex < this.vocableList.length; vocableIndex++) {
        let croatian: string = this.croatianChip.value.trim();
        let german: string = this.germanChip.value.trim();
        if (this.wordMatches(vocableIndex, croatian, german)) {
          this.removeWordsfromLists(vocableIndex, croatian, german);
          break;
        }
      }

      this.deselectCroatianAndGermanChip();

    }, 500);
  }

  private wordMatches(vocableIndex: number, croatian: string, german: string) {
    return this.vocableList[vocableIndex].croatian === croatian &&
      this.vocableList[vocableIndex].german === german
  }

  private removeWordsfromLists(vocableIndex: number, croatian: string, german: string) {
    this.croatianVocableList.splice(
      this.croatianVocableList.indexOf(croatian),
      1);
    this.germanVocableList.splice(
      this.germanVocableList.indexOf(german),
      1);
    this.vocableList.splice(vocableIndex, 1);
  }

  private deselectCroatianAndGermanChip() {
    this.croatianChip.deselect();
    this.germanChip.deselect();
  }

  ngOnDestroy() {
    this.categorySelectedSubscription.unsubscribe();
  }
}
