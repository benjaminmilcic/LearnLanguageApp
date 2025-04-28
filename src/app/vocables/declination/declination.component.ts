import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Chapter, DatabaseService, Declination } from 'src/app/shared/database.service';

@Component({
  selector: 'app-declination',
  templateUrl: './declination.component.html',
  styleUrls: ['./declination.component.css'],
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
    instrumentalPlural: '',
  };

  options: string[] = [];
  searchField = new FormControl('');
  filteredOptions: Observable<string[]>;
  language: string;
  translation: string;

  playAudio = new Audio();
  audioPath = 'https://www.goethe-verlag.com/sounds/_alleima/_mp3/';

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.database = this.databaseService.getDatabase();
    this.declinationList = this.databaseService.getDeclinationList();
    this.options = this.databaseService.getSearchList();

    this.filteredOptions = this.searchField.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(wordToSearch: string) {
    this.emptySearchField();
    this.declination = this.getDeclinationOfWord(wordToSearch);
    this.language = this.checkLanguageOfWord();
    this.translation = this.getTranslationOfWord(wordToSearch);
  }

  emptySearchField() {
    this.searchField.setValue('');
  }

  getDeclinationOfWord(wordToSearch: string): Declination {
    let index = this.options.indexOf(wordToSearch);
    return this.declinationList[index];
  }

  checkLanguageOfWord(): string {
    let lokativIsUndefined = this.declination.lokativSingular === undefined;
    return lokativIsUndefined ? 'german' : 'croatian';
  }

  getTranslationOfWord(word: string): string {
    let translation = 'No translation available!';
    this.database.map((chapter) => {
      chapter.vocables.map((vocable) => {
        if (vocable[this.language] === word) {
          translation =
            this.language === 'croatian'
              ? vocable['german']
              : vocable['croatian'];
        }
      });
    });
    return translation;
  }

  setLanguage(language: string): string {
    return language === 'croatian' ? 'deutsch' : 'kroatisch';
  }

  onPlayAudio(word: string) {
    let wordToPlay: string;
    let audioLanguage: string;
    this.database.map((chapter) => {
      chapter.vocables.map((vocable) => {
        if (vocable.croatian === word) {
          audioLanguage = 'HR';
          wordToPlay = vocable.audioNr;
        }
        if (vocable.german === word) {
          audioLanguage = 'DE';
          wordToPlay = vocable.audioNr;
        }
      });
    });
    this.playAudio.src =
      this.audioPath + audioLanguage + '/' + wordToPlay + '.mp3';
    this.playAudio.play();
  }
}