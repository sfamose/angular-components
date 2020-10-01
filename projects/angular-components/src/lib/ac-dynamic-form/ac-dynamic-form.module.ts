import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFieldDirective} from './components/dynamic-field.directive';
import {FieldGroupComponent} from './components/field-group/field-group.component';
import {FieldDatetimeComponent} from './components/field-datetime/field-datetime.component';
import {FieldSelectComponent} from './components/field-select/field-select.component';
import {FieldInputComponent} from './components/field-input/field-input.component';
import {FieldRadioButtonComponent} from './components/field-radio-button/field-radio-button.component';
import {FieldCheckboxComponent} from './components/field-checkbox/field-checkbox.component';
import {FieldTextareaComponent} from './components/field-textarea/field-textarea.component';
import {InputDatetimeComponent} from './components/input-datetime/input-datetime.component';
import {FieldTimeComponent} from './components/field-time/field-time.component';
import {DivTextComponent} from './components/div-text/div-text.component';
import {FieldCustomComponent} from './components/field-custom/field-custom.component';
import {FieldDateComponent} from './components/field-date/field-date.component';
import {FieldCustomDirective} from './components/field-custom/field-custom.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_INPUT_MAXLENGTH,
  DEFAULT_LOCALE, DEFAULT_MAT_FORM_FIELD_APPEARANCE, DEFAULT_MAT_FORM_FIELD_FLOATLABEL,
  INPUT_MAXLENGTH,
  MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL
} from './config/default-config';
import {AcDynamicFormConfig} from './config/ac-dynamic-form-config';
import {AcDynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {DynamicFormModalComponent} from './dynamic-form-modal/dynamic-form-modal.component';
import { FieldAutocompleteComponent } from './components/field-autocomplete/field-autocomplete.component';

@NgModule({
  declarations: [
    AcDynamicFormComponent,
    FieldCheckboxComponent,
    FieldDateComponent,
    FieldInputComponent,
    FieldRadioButtonComponent,
    DynamicFieldDirective,
    FieldSelectComponent,
    FieldTimeComponent,
    FieldGroupComponent,
    FieldTextareaComponent,
    FieldDatetimeComponent,
    InputDatetimeComponent,
    DivTextComponent,
    FieldCustomComponent,
    FieldCustomDirective,
    DynamicFormModalComponent,
    FieldAutocompleteComponent
  ],
  exports: [AcDynamicFormComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: DEFAULT_LOCALE}, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    }, {provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMAT},
    {
      provide: MAT_FORM_FIELD_APPEARANCE,
      useValue: DEFAULT_MAT_FORM_FIELD_APPEARANCE
    },
    {
      provide: MAT_FORM_FIELD_FLOATLABEL,
      useValue: DEFAULT_MAT_FORM_FIELD_FLOATLABEL
    },
    {
      provide: INPUT_MAXLENGTH,
      useValue: DEFAULT_INPUT_MAXLENGTH
    }
  ]
})
export class AcDynamicFormModule {
  static setConfig(config: AcDynamicFormConfig): ModuleWithProviders<AcDynamicFormModule> {
    return {
      ngModule: AcDynamicFormModule,
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: config.locale ? config.locale : DEFAULT_LOCALE},
        {provide: MAT_DATE_FORMATS, useValue: config.dateFormat ? config.dateFormat : DEFAULT_DATE_FORMAT},
        {
          provide: MAT_FORM_FIELD_APPEARANCE,
          useValue: config.matFormFieldAppearance ? config.matFormFieldAppearance : DEFAULT_MAT_FORM_FIELD_APPEARANCE
        },
        {
          provide: MAT_FORM_FIELD_FLOATLABEL,
          useValue: config.matFormFieldFloatlabel ? config.matFormFieldFloatlabel : DEFAULT_MAT_FORM_FIELD_FLOATLABEL
        },
        {
          provide: INPUT_MAXLENGTH,
          useValue: config.inputMaxlength ? config.inputMaxlength : DEFAULT_INPUT_MAXLENGTH
        }
      ]
    };
  }
}
