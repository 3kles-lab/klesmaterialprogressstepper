import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgressBarStepComponent } from './components/progress-bar/step/progress-bar-step.component';

const components = [
    ProgressBarComponent,
    ProgressBarStepComponent
];

@NgModule({
    declarations: [
        components
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    providers: [],
    exports: [
        components
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class KlesMaterialProgressStepperModule {
    static declarations = [
        components
    ];
}
