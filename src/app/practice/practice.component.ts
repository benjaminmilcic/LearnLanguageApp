import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { DatabaseService } from '../shared/database.service';
import { VocablelistService } from './vocablelist.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  constructor(
    private databaseService: DatabaseService,
    public vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.vocablelistService.vocableList = this.databaseService.getVocableList(1);
  }

}
