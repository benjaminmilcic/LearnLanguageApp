import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService, Letter } from 'src/app/shared/database.service';
import { AlphabetService } from '../alphabet.service';

@Component({
  selector: 'app-alphabet-audio',
  templateUrl: './alphabet-audio.component.html',
  styleUrls: ['./alphabet-audio.component.css']
})
export class AlphabetAudioComponent implements OnInit, OnDestroy {

  alphabet: Letter[] = [];
  playAudio = new Audio;
  audioPath = '/assets/audio/';

  selectedLetterSubscription: Subscription;
  letterIndex: number;

  constructor(private databaseService: DatabaseService, private alphabetService:AlphabetService) { }

  ngOnInit() {
    this.alphabet = this.databaseService.getAlphabet();
    this.selectedLetterSubscription = this.alphabetService.selectedLetterSubject.subscribe(index => {
      this.letterIndex = index;
    })
  }

  onPlayAudio(letterIndex: number) {
    this.playAudio.src = this.audioPath + this.alphabet[letterIndex].audioPath;
    this.playAudio.play();
  }

  ngOnDestroy(){
    this.selectedLetterSubscription.unsubscribe();
  }

}
