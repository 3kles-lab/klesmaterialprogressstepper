import { TooltipPosition } from "@angular/material/tooltip";
import { ProgressBarStatus } from "../enums/progress-bar-status.enum";

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
