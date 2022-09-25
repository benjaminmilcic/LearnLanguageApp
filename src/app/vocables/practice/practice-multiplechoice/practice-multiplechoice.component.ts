import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyVocable } from 'src/app/shared/vocable.model';
import { VocablelistService } from '../../../shared/vocablelist.service';

@Component({
  selector: 'app-practice-multiplechoice',
  templateUrl: './practice-multiplechoice.component.html',
  styleUrls: ['./practice-multiplechoice.component.css']
})
export class PracticeMultiplechoiceComponent implements OnInit, OnDestroy {

  @ViewChild('buttons') buttons: ElementRef;

  vocableList: MyVocable[] = [];
  croatianVocableList: string[] = [];
  germanVocableList: string[] = [];

  wordListForButtons: string[] = [];
  numberOfButtons: number;
  styleOfButtons: string[] = [];
  defaultButtonStyle = '';
  disabledWhileWaiting = false;

  wordToPractice!: MyVocable;
  wordToPracticeIndex: number;
  wrongAnswered: boolean;
  language = "german";
  otherLanguage = "croatian";
  sprache = 'Deutsche';

  playAudio = new Audio;
  audioMode: boolean;
  audioPath = 'https://www.goethe-verlag.com/book2/_alleima/_mp3/';
  audioLanguage = 'HR';

  categorySelectedSubscription: Subscription;
  loadVocableListSubscription: Subscription;

  constructor(public vocablelistService: VocablelistService) { }

  ngOnInit() {
    this.categorySelectedSubscription = this.vocablelistService.categorySelectedSubject.subscribe(() => {
      this.audioMode = false;
      this.startMultipleChoice();
    });
    this.loadVocableListSubscription = this.vocablelistService.loadVocableListSubject.subscribe((vocableList) => {
      this.vocablelistService.vocableList = vocableList;
      this.startMultipleChoice();
    })
  }

  private startMultipleChoice() {
    this.vocableList = this.vocablelistService.vocableList;
      const existWordsToPractice = this.checkIfExistWordsToPractice();
      if (existWordsToPractice) {
        this.createVocableButtons();
      }
  }

  private checkIfExistWordsToPractice() {
    return this.vocableList.length > 0 ? true : false;
  }

  private createVocableButtons(play: boolean = true) {

    this.deleteWordListForButtons();
    this.setNumberOfButtons();
    this.setDefaultButtonStyles();
    this.setWordToPractice();
    this.putWordToPracticeOnOneButton();
    this.fillOtherButtonsWithRandomWords()
    this.randomizeButtonOrder();
    this.setWrongAnsweredToFalse();
    if (play) {
      this.playIfAudioMode();
    }
  }

  private deleteWordListForButtons() {
    this.wordListForButtons = [];
  }

  private setNumberOfButtons() {
    this.numberOfButtons = 5;
    const lessVocablesToPracticeThanButtons: boolean = this.vocableList.length < this.numberOfButtons;
    if (lessVocablesToPracticeThanButtons) {
      this.numberOfButtons = this.vocableList.length;
    }
  }

  private setDefaultButtonStyles() {
    this.styleOfButtons = [];
    for (let buttonNr = 0; buttonNr < this.numberOfButtons; buttonNr++) {
      this.styleOfButtons[buttonNr] = this.defaultButtonStyle;
    }
  }

  private setWordToPractice() {
    this.wordToPracticeIndex = Math.floor((Math.random() * this.vocableList.length));
    this.wordToPractice = this.vocableList[this.wordToPracticeIndex];
  }

  private putWordToPracticeOnOneButton() {
    this.wordListForButtons[0] = this.wordToPractice[this.language];
  }

  private fillOtherButtonsWithRandomWords() {
    let allButtonsAreFilled: boolean = this.wordListForButtons.length >= this.numberOfButtons;

    while (!allButtonsAreFilled) {

      const randomWord = this.createRandomWord();
      const buttonWithThisWordAlreadyExist: boolean = this.checkIfButtonWithThisWordAlreadyExist(randomWord);

      if (!buttonWithThisWordAlreadyExist) {
        this.addWordToButtonList(randomWord);
      }

      allButtonsAreFilled = this.wordListForButtons.length === this.numberOfButtons;
    }
  }

  private createRandomWord() {
    const randomIndex = Math.floor((Math.random() * this.vocableList.length));
    const randomWord = this.vocableList[randomIndex];
    return randomWord[this.language];
  }

  private checkIfButtonWithThisWordAlreadyExist(word: string) {
    let buttonWithThisWordAlreadyExist!: boolean;

    for (let buttonNr = 0; buttonNr < this.wordListForButtons.length; buttonNr++) {
      buttonWithThisWordAlreadyExist = this.wordListForButtons[buttonNr] === word;
      if (buttonWithThisWordAlreadyExist) {
        break;
      }
    }
    return buttonWithThisWordAlreadyExist;
  }

  private addWordToButtonList(word: string) {
    this.wordListForButtons.push(word);
  }

  private randomizeButtonOrder() {
    this.wordListForButtons.sort(() => 0.5 - Math.random());
  }

  private setWrongAnsweredToFalse() {
    this.wrongAnswered = false;
  }

  private playIfAudioMode() {
    if (this.audioMode) {
      this.onPlayAudio();
    }
  }

  onButtonClick(buttonNr: number) {
    this.disabledWhileWaiting = true;
    const isRightAnswer: boolean = this.wordToPractice[this.language] === this.wordListForButtons[buttonNr];
    this.setButtonColorAndContinue(buttonNr, isRightAnswer);
  }

  private setButtonColorAndContinue(buttonNr: number, isRightAnswer: boolean) {
    if (isRightAnswer) {
      this.styleOfButtons[buttonNr] = 'right';
      this.switchToNextWord();
    } else {
      this.disabledWhileWaiting = false;
      this.styleOfButtons[buttonNr] = 'wrong';
      this.wrongAnswered = true;
    }
  }

  private async switchToNextWord() {
    const wait = new Promise(resolve => setTimeout(resolve, 1500));
    await wait.then(() => {
      this.disabledWhileWaiting = false;
      if (!this.wrongAnswered) {
        this.wrongAnswered = false;
        this.vocableList.splice(this.wordToPracticeIndex, 1);
      }
      const existWordsToPractice = this.checkIfExistWordsToPractice();
      if (existWordsToPractice) {
        this.createVocableButtons();
      } else {
        this.vocablelistService.allDone = true;
      }
    });
  }

  onToggleLanguage() {
    if (this.language === 'german') {
      this.language = 'croatian';
      this.otherLanguage = 'german';
      this.audioLanguage = 'DE';
      this.sprache = 'Kroatische';
    } else {
      this.language = 'german';
      this.otherLanguage = 'croatian';
      this.audioLanguage = 'HR';
      this.sprache = 'Deutsche';
    }
    this.createVocableButtons(false);
  }

  onPlayAudio() {
    this.playAudio.src = this.audioPath + this.audioLanguage + '/' + this.wordToPractice.audio + '.mp3';
    this.playAudio.play();
  }

  ngOnDestroy() {
    this.categorySelectedSubscription.unsubscribe();
    this.loadVocableListSubscription.unsubscribe();
  }
}