import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule

    ],
    exports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule
    ]
})
export class MaterialModule { }