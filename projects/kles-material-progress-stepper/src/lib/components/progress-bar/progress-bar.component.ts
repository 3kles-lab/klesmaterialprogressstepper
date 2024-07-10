import { Component, input } from "@angular/core";
import { TooltipPosition } from "@angular/material/tooltip";
import { Subject } from "rxjs";

export enum ProgressBarStatus {
    SUCCESS,
    PENDING,
    ERROR,
    STOP
}

export interface ProgressBarStep {
    name: string;
    label?: string;
    icon?: string;
    iconSuccess?: string;
    iconError?: string;
    status?: ProgressBarStatus;
    errorMessage?: string;
    color?: string;
    matTooltipPosition?: TooltipPosition;
}

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
