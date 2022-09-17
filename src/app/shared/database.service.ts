import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MyVocable } from './vocable.model';

interface Chapter {
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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: Chapter[] = [];
  private alphabet: Letter[] = [];

  private alphabetLoaded = false;
  private databaseLoaded = false;
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
        if (this.databaseLoaded && this.alphabetLoaded) {
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
        if (this.databaseLoaded && this.alphabetLoaded) {
          this.allLoaded = true;
        }
      });
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
}