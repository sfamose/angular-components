import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormExamplesRoutingModule} from './form-examples-routing.module';
import {FormSimpleComponent} from './form-simple/form-simple.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldComponent} from './mat-form-field/mat-form-field.component';
import {InputComponent} from './input/input.component';
import {ValidationsComponent} from './validations/validations.component';
import {SelectComponent} from './select/select.component';
import {TextareaComponent} from './textarea/textarea.component';
import {RadioButtonComponent} from './radio-button/radio-button.component';
import {DateComponent} from './date/date.component';
import {DynamicExampleComponent} from './dynamic-example/dynamic-example.component';
import {CustomInputComponent} from './custom-input/custom-input.component';
import {InputRatingComponent} from './custom-input/input-rating/input-rating.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AcDynamicFormModule} from 'angular-components';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

const config = {
  locale: 'fr'
};

@NgModule({
  declarations: [
    FormSimpleComponent,
    MatFormFieldComponent,
    InputComponent,
    ValidationsComponent,
    SelectComponent,
    TextareaComponent,
    RadioButtonComponent,
    DateComponent,
    DynamicExampleComponent,
    CustomInputComponent,
    InputRatingComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormExamplesRoutingModule,
    AcDynamicFormModule.setConfig(config),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  entryComponents: [InputRatingComponent]
})
export class FormExamplesModule {


}
