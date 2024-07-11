import { Component, ElementRef, input, OnInit } from "@angular/core";
import { ProgressBarStep } from "../../interfaces/progress-bar-step.interface";

@Component({
    selector: 'progress-bar-step',
    templateUrl: 'progress-bar-step.component.html',
    styleUrls: ['./progress-bar-step.component.scss']
})
export class ProgressBarStepComponent implements OnInit {
    step = input.required<ProgressBarStep>();
    firstStep = input<boolean>();
    currentStep = input<boolean>();

    icon: string;

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        this.icon = this.initIcon();

        this.element.nativeElement.style.setProperty('--dynamic-step-separator-color', this.step().color ? this.step().color : (this.step().status === 0 ? 'rgb(60, 179, 113)' : (this.step().status === 2 ? 'red' : 'dimgray')));
        this.element.nativeElement.style.setProperty('--dynamic-step-icon-color', this.step().color ? this.step().color : (this.step().status === 0 ? 'rgb(60, 179, 113)' : (this.step().status === 2 ? 'red' : 'black')));
    }

    private initIcon(): string {
        if (this.step().status === 0) {
            return this.step().iconSuccess || 'task_alt';
        }
        else if (this.step().status === 2) {
            return this.step().iconError || 'error';
        }

        return this.step().icon || 'more_horiz';
    }
}
