import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-declination',
  templateUrl: './declination.component.html',
  styleUrls: ['./declination.component.css']
})
export class DeclinationComponent implements OnInit {

  options: string[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  constructor(private databaseService: DatabaseService) { }

  

  ngOnInit() {
    this.options = this.databaseService.getSearchList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}