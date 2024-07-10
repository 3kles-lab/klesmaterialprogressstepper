import { Component, input } from "@angular/core";
import { ProgressBarStep } from "../progress-bar.component";

@Component({
    selector: 'progress-bar-step',
    templateUrl: 'progress-bar-step.component.html',
    styleUrls: ['./progress-bar-step.component.scss']
})
export class ProgressBarStepComponent {
    step = input.required<ProgressBarStep>();
    currentStep = input.required<boolean>();
}
