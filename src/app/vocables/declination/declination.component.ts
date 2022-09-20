import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Chapter, DatabaseService, Declination } from 'src/app/shared/database.service';

@Component({
  selector: 'app-declination',
  templateUrl: './declination.component.html',
  styleUrls: ['./declination.component.css']
})
export class DeclinationComponent implements OnInit {

  database: Chapter[] = [];

  declinationList: Declination[] = [];
  declination: Declination = {
    nominativSingular: '',
    genitivSingular: '',
    dativSingular: '',
    akkusativSingular: '',
    lokativSingular: '',
    vokativSingular: '',
    instrumentalSingular: '',
    nominativPlural: '',
    genitivPlural: '',
    dativPlural: '',
    akkusativPlural: '',
    lokativPlural: '',
    vokativPlural: '',
    instrumentalPlural: ''
  };
  options: string[] = [];
  searchField = new FormControl('');
  filteredOptions: Observable<string[]>;
  isCroatian: boolean;

  constructor(private databaseService: DatabaseService) { }



  ngOnInit() {
    this.declinationList = this.databaseService.getDeclinationList();
    this.options = this.databaseService.getSearchList();
    this.filteredOptions = this.searchField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getTranslation(word:string) {
    this.database = this.databaseService.getDatabase();
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(wordToSearch: string) {
    console.log(this.searchField.value);
    this.emptySearchField();
    this.getDeclinationOfWord(wordToSearch);
    this.checkLanguageOfWord();
  }

  emptySearchField() {
    this.searchField.setValue('');
  }

  getDeclinationOfWord(wordToSearch: string) {
    let index = this.options.indexOf(wordToSearch);
    this.declination = this.declinationList[index];
  }


  checkLanguageOfWord() {
    let isUndefined = this.declination.lokativSingular === undefined;
    if (isUndefined) {
      this.isCroatian = false;
    } else {
      let existLokativ: boolean = this.declination.lokativSingular!.length > 0
      this.isCroatian = existLokativ ? true : false;
    }
  }
}