import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { VocablelistService } from '../../../shared/vocablelist.service';
import { DatabaseService } from '../../../shared/database.service';

@Component({
  selector: 'app-practice-categories',
  templateUrl: './practice-categories.component.html',
  styleUrls: ['./practice-categories.component.css']
})
export class PracticeCategoriesComponent implements OnInit, AfterViewInit {

  categories: string[] = [];
  @ViewChild('chipList') chipList: MatChipList;

  constructor(private databaseService: DatabaseService, private vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categories = this.databaseService.getCategoyList();
  }

  ngAfterViewInit() {
    this.chipList.chips.first.select();
  }

  onSelectCategory(chip: MatChip, categoryIndex: number) {
    if (chip.selected) {
      chip.color = "accent";
      console.log(categoryIndex);
      this.vocablelistService.allDone = false;
      this.vocablelistService.categorySelectedSubject.next(categoryIndex);
    }
  }
}
