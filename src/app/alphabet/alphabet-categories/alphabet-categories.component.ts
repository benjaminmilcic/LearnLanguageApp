import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList, MatChipSelectionChange } from '@angular/material/chips';
import { AlphabetService } from '../alphabet.service';

@Component({
  selector: 'app-alphabet-categories',
  templateUrl: './alphabet-categories.component.html',
  styleUrls: ['./alphabet-categories.component.css']
})
export class AlphabetCategoriesComponent implements AfterViewInit {

  alphabet: string[] = [
    'A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'LJ', 'M', 'N', 'Nj', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'
  ];
  @ViewChild('chipList') chipList: MatChipList;

  constructor(private alphabetService: AlphabetService) { }

  ngAfterViewInit() {
    this.chipList.chips.first.select();
  }

  onSelectLetter(chip: MatChip, index: number) {
    chip.select();
    this.alphabetService.selectedLetterSubject.next(index);
  }

  onSelectionChange(event: MatChipSelectionChange) {
    if (event.isUserInput) {
      event.source.deselect();
    }
  }
}
