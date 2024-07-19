import { Component, ViewChild } from '@angular/core';
import { ProgressBarComponent, ProgressBarStatus, ProgressBarStep } from 'kles-material-progress-stepper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('progressBar', { static: true }) progressBar: ProgressBarComponent;

    steps: ProgressBarStep[] = [
        { name: 'step1', label: 'Fill out your home', status: ProgressBarStatus.SUCCESS/*, iconSuccess: 'home'*/ },
        { name: 'step2', label: 'test2222222222', errorMessage: 'test', status: ProgressBarStatus.ERROR, color: 'red'/*, matTooltipPosition: 'left'*/ },
        { name: 'step3' },
        { name: 'step4', label: 'Fill out your name' },
        { name: 'step5', label: 'Done' }
    ];

    constructor() { }

    up() {
        this.progressBar.next({ nextStatus: ProgressBarStatus.ERROR });
    }

    down() {
        this.progressBar.previous();
    }
}
