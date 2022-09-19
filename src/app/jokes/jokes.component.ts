import { Component, OnInit } from '@angular/core';
import viceviJson from 'src/assets/vicevi.json';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  jokeID: number;
  joke: any;
  language = 'kroatisch';
  allJokes = viceviJson;

  constructor() { }

  ngOnInit() {
    this.onChangeJoke();
  }

  onToggleLanguage() {
    this.language = this.language === 'kroatisch' ? this.language = 'deutsch' : this.language = 'kroatisch';
  }

  onChangeJoke() {
    this.jokeID = Math.floor(Math.random() * this.allJokes.length);
    this.joke = this.allJokes[this.jokeID];
  }

  onPreviousJoke() { 
    this.jokeID = this.jokeID - 1;
    if (this.jokeID < 0) {
      this.jokeID = this.allJokes.length - 1;
    }
    this.joke = this.allJokes[this.jokeID];
  }
  
  onNextJoke() { 
    this.jokeID = this.jokeID + 1;
    if (this.jokeID > this.allJokes.length-1) {
      this.jokeID = 0;
    }
    this.joke = this.allJokes[this.jokeID];
  }
}
