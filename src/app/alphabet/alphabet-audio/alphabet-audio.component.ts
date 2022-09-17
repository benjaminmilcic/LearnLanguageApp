import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService, Letter } from 'src/app/shared/database.service';
import { AlphabetService } from '../alphabet.service';

@Component({
  selector: 'app-alphabet-audio',
  templateUrl: './alphabet-audio.component.html',
  styleUrls: ['./alphabet-audio.component.css']
})
export class AlphabetAudioComponent implements OnInit {

  alphabet: Letter[] = [];
  playAudio = new Audio;
  audioPath = 'https://www.kroatischlernen.eu/audio/alphabet/';

  selectedLetterSubscription: Subscription;
  letterIndex: number;

  constructor(private databaseService: DatabaseService, private alphabetService:AlphabetService) { }

  ngOnInit() {
    this.alphabet = this.databaseService.getAlphabet();
    this.selectedLetterSubscription = this.alphabetService.selectedLetterSubject.subscribe(index => {
      this.letterIndex = index;
    })
  }

  onPlayAudio(index: number) {
    this.playAudio.src = this.audioPath + this.alphabet[index].audioPath;
    this.playAudio.play();
  }

}
