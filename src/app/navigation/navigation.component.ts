import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DatabaseService } from '../shared/database.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  showVocablesSubMenu = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      // shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public databaseService: DatabaseService) { }

  closeDrawer(drawer: MatSidenav) {
    
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        drawer.close()
      }
    })
  }

  changeFocus() {
    (document.activeElement as HTMLElement).blur();
  }
}
