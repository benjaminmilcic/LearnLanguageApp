import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { interval, Subscription } from 'rxjs';
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
  croatianHint: string;
  germanHint: string;
  showCroatianHint: boolean = false;
  showGermanHint: boolean = false;

  @ViewChild('croatianChipList') croatianChipList: MatChipList;
  @ViewChild('germanChipList') germanChipList: MatChipList;

  categorySelectedSubscription: Subscription;
  loadVocableListSubscription: Subscription;

  constructor(public vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.loadVocableListSubscription = this.vocablelistService.loadVocableListSubject.subscribe((vocableList) => {
      this.vocablelistService.vocableList = vocableList;
      this.startAssign();
    }),
      this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(() => {
        this.startAssign();
      });
  }

  startAssign() {
    this.getVocableList();
    this.emptyChipLists();
    this.fillChipLists();
    this.randomizeChipLists();
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
    chip.toggleSelected();
    this.croatianChip = chip;
    if (this.germanChip && this.germanChip.selected) {
      this.compareSelections();
    }
    if (!this.germanChip || !this.germanChip.selected) {
      this.showGermanHint = true;
      this.germanHint = this.setGermanHint();
    }
  }

  toggleGermanListSelection(chip: MatChip) {
    chip.select();
    this.germanChip = chip;
    if (this.croatianChip && this.croatianChip.selected) {
      this.compareSelections();
    }
    if (!this.croatianChip || !this.croatianChip.selected) {
      this.showCroatianHint = true;
      this.croatianHint = this.setCroatianHint();
    }
  }

  private setCroatianHint(): string {
    const germanWord: string = this.germanChip.value.trim();
    const index = this.vocableList.map(vocable => vocable.german).indexOf(germanWord);
    const croatianWord = this.vocableList.map(vocable => vocable.croatian)[index];
    return croatianWord;
  }

  private setGermanHint(): string {
    const croatianWord: string = this.croatianChip.value.trim();
    const index = this.vocableList.map(vocable => vocable.croatian).indexOf(croatianWord);
    const germanWord = this.vocableList.map(vocable => vocable.german)[index];
    return germanWord;
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
      if (this.croatianVocableList.length === 0) {
        this.vocablelistService.allDone = true;
      }

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
    this.showCroatianHint = false;
    this.showGermanHint = false;
  }

  ngOnDestroy() {
    this.categorySelectedSubscription.unsubscribe();
    this.loadVocableListSubscription.unsubscribe();
  }

  onCroatianHint() {
    const index = this.croatianVocableList.indexOf(this.croatianHint.trim());
    const rightChip = (this.croatianChipList.chips.get(index)._elementRef.nativeElement as HTMLElement);
    rightChip.style.backgroundColor = '#f44336';
    setTimeout(() => {
      rightChip.style.backgroundColor = '';
    },
      1000);
  }

  onGermanHint() {
    const index = this.germanVocableList.indexOf(this.germanHint.trim());
    const rightChip = (this.germanChipList.chips.get(index)._elementRef.nativeElement as HTMLElement);
    rightChip.style.backgroundColor = '#f44336';
    setTimeout(() => {
      rightChip.style.backgroundColor = '';
    },
      1000);
  }
}
