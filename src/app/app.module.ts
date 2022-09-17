import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { PracticeComponent } from './practice/practice.component';
import { PracticeAssignComponent } from './practice/practice-assign/practice-assign.component';
import { PracticeMultiplechoiceComponent } from './practice/practice-multiplechoice/practice-multiplechoice.component';
import { PracticeCategoriesComponent } from './practice/practice-categories/practice-categories.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { AlphabetYoutubeplayerComponent } from './alphabet/alphabet-video/alphabet-youtubeplayer/alphabet-youtubeplayer.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AlphabetVideoComponent } from './alphabet/alphabet-video/alphabet-video.component';
import { AlphabetCategoriesComponent } from './alphabet/alphabet-categories/alphabet-categories.component';
import { AlphabetAudioComponent } from './alphabet/alphabet-audio/alphabet-audio.component';


@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    PracticeAssignComponent,
    PracticeMultiplechoiceComponent,
    PracticeCategoriesComponent,
    NavigationComponent,
    AlphabetComponent,
    AlphabetYoutubeplayerComponent,
    AlphabetVideoComponent,
    AlphabetCategoriesComponent,
    AlphabetAudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
