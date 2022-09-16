import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    const vocableList = this.databaseService.fetchData();
  }
}
