import { Component, input } from "@angular/core";
import { Subject } from "rxjs";
import { ProgressBarStep } from "../../interfaces/progress-bar-step.interface";
import { ProgressBarStatus } from "../../enums/progress-bar-status.enum";

@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
    steps = input.required<ProgressBarStep[]>();
    private _currentStep: number = 0;

    _onUpdateStep = new Subject<ProgressBarStep>();
    _onChangeStep = new Subject<ProgressBarStep>();

    constructor() { }

    get currentStep(): number {
        return this._currentStep;
    }

    updateStep(name: string, step: { status?: ProgressBarStatus, errorMessage?: string, icon?: string, label?: string }): void {
        const index = this.steps().findIndex(s => s.name === name);
        const newStep = { ...this.steps()[index], ...step };
        this.steps()[index] = newStep;

        this._onUpdateStep.next(newStep);
    }

    next(options?: { currentStatus?: ProgressBarStatus, nextStatus?: ProgressBarStatus }): void {
        if (this.currentStep < this.steps().length - 1) {
            if (options?.currentStatus) {
                const step = this.steps()[this.currentStep];
                this.steps()[this.currentStep] = { ...step, status: options.currentStatus };
            }

            const nextStep = this.steps()[this.currentStep + 1];
            this.steps()[this.currentStep + 1] = { ...nextStep, status: options?.nextStatus ? options.nextStatus : ProgressBarStatus.PENDING };

            this._onChangeStep.next(this.steps()[this.currentStep + 1]);
            this._currentStep++;
        }
    }

    previous(options?: { currentStatus?: ProgressBarStatus, previousStatus?: ProgressBarStatus }): void {
        if (this.currentStep > 0) {
            const step = this.steps()[this.currentStep];
            this.steps()[this.currentStep] = { ...step, status: options?.currentStatus ? options.currentStatus : ProgressBarStatus.STOP };

            const previousStep = this.steps()[this.currentStep - 1];
            this.steps()[this.currentStep - 1] = { ...previousStep, status: options?.previousStatus ? options.previousStatus : ProgressBarStatus.PENDING };

            this._onChangeStep.next(this.steps()[this.currentStep - 1]);
            this._currentStep--;
        }
    }
}
