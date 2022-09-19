import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PracticeComponent } from './vocables/practice/practice.component';
import { PracticeAssignComponent } from './vocables/practice/practice-assign/practice-assign.component';
import { PracticeMultiplechoiceComponent } from './vocables/practice/practice-multiplechoice/practice-multiplechoice.component';
import { PracticeCategoriesComponent } from './vocables/practice/practice-categories/practice-categories.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { AlphabetYoutubeplayerComponent } from './alphabet/alphabet-video/alphabet-youtubeplayer/alphabet-youtubeplayer.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AlphabetVideoComponent } from './alphabet/alphabet-video/alphabet-video.component';
import { AlphabetCategoriesComponent } from './alphabet/alphabet-categories/alphabet-categories.component';
import { AlphabetAudioComponent } from './alphabet/alphabet-audio/alphabet-audio.component';
import { JokesComponent } from './jokes/jokes.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
import { DeclinationComponent } from './vocables/declination/declination.component';


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
    AlphabetAudioComponent,
    JokesComponent,
    PageNotFoundComponent,
    DeclinationComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    YouTubePlayerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
