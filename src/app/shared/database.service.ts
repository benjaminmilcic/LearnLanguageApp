import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MyVocable } from './vocable.model';
import { tap } from 'rxjs';

export interface Chapter {
  german: string,
  croatian: string,
  chapterNr: string,
  vocables: Vocable[]
}

interface Vocable {
  german: string,
  croatian: string,
  imagePath: string,
  audioNr: string,
  chapterIndex: number,
  checked: boolean
}

export interface Letter {
  letter: string,
  spell: string,
  germanExample: string,
  example: string,
  audioPath: string
}

export interface Declination {
  nominativSingular?: string,
  genitivSingular?: string,
  dativSingular?: string,
  akkusativSingular?: string,
  lokativSingular?: string,
  vokativSingular?: string,
  instrumentalSingular?: string,
  nominativPlural?: string,
  genitivPlural?: string,
  dativPlural?: string,
  akkusativPlural?: string,
  lokativPlural?: string,
  vokativPlural?: string,
  instrumentalPlural?: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: Chapter[] = [];
  private alphabet: Letter[] = [];
  private declinationList: Declination[] = [];
  private searchList: string[] = [];

  private alphabetLoaded = false;
  private databaseLoaded = false;
  private declinationLoaded = false;

  allLoaded = false;

  constructor(private http: HttpClient) { }

  fetchData() {
    this.http.get<Chapter[]>('https://vocabularyinputapp-default-rtdb.europe-west1.firebasedatabase.app/exampleDatabase.json').subscribe(data => {
      this.database = data;
    },
      error => {
        throw new Error(error);
      },
      () => {
        this.databaseLoaded = true;
        if (this.databaseLoaded && this.alphabetLoaded && this.declinationLoaded) {
          this.allLoaded = true;
        }
      });

    this.http.get<Letter[]>('https://vocabularyinputapp-default-rtdb.europe-west1.firebasedatabase.app/alphabet.json').subscribe(data => {
      this.alphabet = data;
    },
      error => {
        throw new Error(error);
      },
      () => {
        this.alphabetLoaded = true;
        if (this.databaseLoaded && this.alphabetLoaded && this.declinationLoaded) {
          this.allLoaded = true;
        }
      });

    this.http.get<Declination[]>('https://vocabularyinputapp-default-rtdb.europe-west1.firebasedatabase.app/declination_hr_de.json')
      .subscribe(data => {
        this.declinationList = data;
        this.declinationList = this.declinationList.filter((element) => {
          let noSingular = element.nominativSingular==='/';
          return (!noSingular);
        });
        this.declinationList = this.declinationList.filter((element) => {
          let noSingular = element.nominativSingular === '';
          return (!noSingular);
        });
        this.declinationList = this.declinationList.filter((element) => {
          let noPlural = element.nominativPlural.length < 4;
          return (!noPlural);
        });
        
    },
      error => {
        throw new Error(error);
      },
        () => {
          this.searchList = this.declinationList.map(word => word.nominativSingular);
        this.declinationLoaded = true;
        if (this.databaseLoaded && this.alphabetLoaded && this.declinationLoaded) {
          this.allLoaded = true;
        }
      });
  }

  getDatabase() {
    return this.database;
  }

  getVocableList(chapter: number) {
    let vocableList: MyVocable[] = [];
    for (
      let vocable = 0;
      vocable < this.database[chapter].vocables.length;
      vocable++
    ) {
      vocableList.push(
        new MyVocable(
          this.database[chapter].vocables[vocable].croatian,
          this.database[chapter].vocables[vocable].german,
          this.database[chapter].vocables[vocable].audioNr
        )
      );
    }
    return vocableList;
  }

  getCategoyList() {
    let categories: string[] = [];
    for (let chapter = 0; chapter < this.database.length; chapter++) {
      categories.push(this.database[chapter].german);
    }
    return categories;
  }

  getAlphabet() {
    return this.alphabet;
  }

  getSearchList() {
    return this.searchList;
  }

  getDeclinationList() {
    return this.declinationList;
  }
}