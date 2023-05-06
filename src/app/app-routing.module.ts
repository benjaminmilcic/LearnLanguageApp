import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomepageComponent } from './homepage/homepage.component';
import { JokesComponent } from './jokes/jokes.component';
import { LinksComponent } from './links/links.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
import { DeclinationComponent } from './vocables/declination/declination.component';
import { PracticeComponent } from './vocables/practice/practice.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'practice', component: PracticeComponent },
  { path: 'alphabet', component: AlphabetComponent },
  { path: 'jokes', component: JokesComponent },
  { path: 'declination', component: DeclinationComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'links', component: LinksComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
