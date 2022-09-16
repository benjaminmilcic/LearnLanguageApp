import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
  { path: 'practice', component: PracticeComponent },
  { path: 'alphabet', component: AlphabetComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
