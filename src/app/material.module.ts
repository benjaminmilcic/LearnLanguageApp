import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule
    ],
    exports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTabsModule,
        MatButtonModule
    ]
})
export class MaterialModule { }