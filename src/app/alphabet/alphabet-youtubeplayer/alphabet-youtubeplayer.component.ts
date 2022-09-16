import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabet-youtubeplayer',
  templateUrl: './alphabet-youtubeplayer.component.html',
  styleUrls: ['./alphabet-youtubeplayer.component.css']
})
export class AlphabetYoutubeplayerComponent implements OnInit {

  apiLoaded = false;

  constructor() { }

  ngOnInit() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
