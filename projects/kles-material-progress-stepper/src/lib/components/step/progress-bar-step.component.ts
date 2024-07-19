import { Component, ElementRef, input, OnInit } from "@angular/core";
import { ProgressBarStep } from "../../interfaces/progress-bar-step.interface";

@Component({
    selector: 'progress-bar-step',
    templateUrl: 'progress-bar-step.component.html',
    styleUrls: ['./progress-bar-step.component.scss']
})
export class ProgressBarStepComponent implements OnInit {
    step = input.required<ProgressBarStep>();
    direction = input<'row' | 'column'>();
    firstStep = input<boolean>();
    currentStep = input<boolean>();

    icon: string;

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        this.initIcon();

        this.element.nativeElement.style.setProperty('--dynamic-step-separator-color', this.getStepColor());
        this.element.nativeElement.style.setProperty('--dynamic-step-icon-color', this.getStepColor());
    }

    private initIcon(): void {
        if (this.step().status === 0) {
            this.icon = this.step().iconSuccess || 'task_alt';
        }
        else if (this.step().status === 2) {
            this.icon = this.step().iconError || 'error';
        }
        else {
            this.icon = this.step().icon || 'more_horiz';
        }
    }

    private getStepColor(): string {
        return this.step().color || 'var(--primary-color)';
    }
}
