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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: Chapter[] = [];

  databaseLoaded = false;

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
}