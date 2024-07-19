import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { KlesMaterialProgressStepperModule } from 'dist/kles-material-progress-stepper';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        KlesMaterialProgressStepperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
