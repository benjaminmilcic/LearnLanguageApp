import { Component, OnInit } from '@angular/core';
import { MyVocable } from 'src/app/shared/vocable.model';
import { VocablelistService } from '../vocablelist.service';

@Component({
  selector: 'app-practice-multiplechoice',
  templateUrl: './practice-multiplechoice.component.html',
  styleUrls: ['./practice-multiplechoice.component.css']
})
export class PracticeMultiplechoiceComponent implements OnInit {

  vocableList: MyVocable[] = [];
  croatianVocableList: string[] = [];
  germanVocableList: string[] = [];

  wordListForButtons: string[] = [];
  numberOfButtons = 5;
  styleOfButtons: string[] = [];
  defaultButtonStyle = '';
  wordToPractice!: MyVocable;
  language: 'german' | 'croatian' = "german";
  otherLanguage: 'german' | 'croatian' = "croatian";

  constructor(public vocablelistService: VocablelistService) { }

  ngOnInit() {

    this.vocableList = this.vocablelistService.vocableList;
    const existWordsToPractice = this.checkIfExistWordsToPractice();
    if (existWordsToPractice) {
      this.createVocableButtons();
    }
  }

  private checkIfExistWordsToPractice() {
    return this.vocableList.length > 0 ? true : false;
  }

  private createVocableButtons() {

    this.deleteWordListForButtons();
    this.setNumberOfButtons();
    this.setDefaultButtonStyles();
    this.setWordToPractice();
    this.putWordToPracticeOnOneButton();
    this.fillOtherButtonsWithRandomWords()
    this.randomizeButtonOrder();
  }

  private deleteWordListForButtons() {
    this.wordListForButtons = [];
  }

  private setNumberOfButtons() {
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
    const randomIndex = Math.floor((Math.random() * this.vocableList.length));
    this.wordToPractice = this.vocableList[randomIndex];
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

  onButtonClick(buttonNr: number) {
    const isRightAnswer: boolean = this.wordToPractice[this.language] === this.wordListForButtons[buttonNr];
    this.setButtonColorAndContinue(buttonNr, isRightAnswer);
  }

  private setButtonColorAndContinue(buttonNr: number, isRightAnswer: boolean) {
    if (isRightAnswer) {
      this.styleOfButtons[buttonNr] = 'right';
      this.switchToNextWord();
    } else {
      this.styleOfButtons[buttonNr] = 'wrong';
    }
  }

  private async switchToNextWord() {
    const wait = new Promise(resolve => setTimeout(resolve, 2000));
    await wait.then(() => {
      this.createVocableButtons();
    });
  }
}
