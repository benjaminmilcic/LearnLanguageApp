import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlphabetService } from '../../alphabet.service';


@Component({
  selector: 'app-alphabet-youtubeplayer',
  templateUrl: './alphabet-youtubeplayer.component.html',
  styleUrls: ['./alphabet-youtubeplayer.component.css']
})
export class AlphabetYoutubeplayerComponent implements OnInit, OnDestroy {

  apiLoaded = false;

  playerWidth = 600;
  playerHeight = this.playerWidth / 1.77777777778;

  videoIdList: string[] = [
    'pzMA3mwwl7g', '6hyrgHVqGQ4', '6qeTTPjFwEk', 'qAUtEdJcU0E',
    'G5kij9eowIY', 'QJ527RfroQM', 'Ndp1QP6S6b8', '4GqoXTiQu0Y',
    'hZANSqqPy30', 'OQ4yCHOcTbw', '8zdgt9i90cE', 'RjEL6yknQX4',
    'nYaXBwcLcwQ', '0EZdNTlpp6E', 'jrWEWeAwM5s', 'SAfcoI8att4',
    'fOy9ff7WhYI', 'zlsywmLFLkY', 'sxcb6ZT717c', 'RsQvEH7N3kY',
    'XOLDozPCTSQ', 'qck0hYEorD0', 'v3R69JoOADQ', 'dL9htnF5vIg',
    'crTzW3Gf85k', 'bN0513Wiq24', 'a6d91tCJ7OQ', 'xefp3l1Hveg',
    'd0IuZUPFZ3g', 'lJPBPSHBe5s'
  ];

  videoId: string;

  selectedLetterSubscription: Subscription;

  @HostListener('window:resize')
  onResize() {
    if (window.screen.width < 600) {
      this.playerWidth = window.screen.width - 40;
      this.playerHeight = this.playerWidth / 1.77777777778;
    }
  }

  constructor(private alphabetService: AlphabetService) { }

  ngOnInit() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    if (window.screen.width < 600) {
      this.playerWidth = window.screen.width - 40;
      this.playerHeight = this.playerWidth / 1.77777777778;
    }

    this.selectedLetterSubscription = this.alphabetService.selectedLetterSubject.subscribe(index => {
      this.videoId = this.videoIdList[index];
    })
  }

  ngOnDestroy(){
    this.selectedLetterSubscription.unsubscribe();
  }
}
