import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTableModule
    ],
    exports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTableModule
    ]
})
export class MaterialModule { }