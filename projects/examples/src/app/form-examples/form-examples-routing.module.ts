import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormSimpleComponent} from './form-simple/form-simple.component';
import {MatFormFieldComponent} from './mat-form-field/mat-form-field.component';
import {InputComponent} from './input/input.component';
import {ValidationsComponent} from './validations/validations.component';
import {SelectComponent} from './select/select.component';
import {TextareaComponent} from './textarea/textarea.component';
import {RadioButtonComponent} from './radio-button/radio-button.component';
import {DateComponent} from './date/date.component';
import {TimeComponent} from './time/time.component';
import {DatetimeComponent} from './datetime/datetime.component';
import {DynamicExampleComponent} from './dynamic-example/dynamic-example.component';
import {CustomInputComponent} from './custom-input/custom-input.component';


const routes: Routes = [
  {path: '', redirectTo: 'form-simple', pathMatch: 'full'},
  {path: 'form-simple', component: FormSimpleComponent},
  {path: 'mat-form-field', component: MatFormFieldComponent},
  {path: 'input', component: InputComponent},
  {path: 'validations', component: ValidationsComponent},
  {path: 'select', component: SelectComponent},
  {path: 'textarea', component: TextareaComponent},
  {path: 'radio-button', component: RadioButtonComponent},
  {path: 'date', component: DateComponent},
  {path: 'time', component: TimeComponent},
  {path: 'datetime', component: DatetimeComponent},
  {path: 'dynamic-example', component: DynamicExampleComponent},
  {path: 'custom', component: CustomInputComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormExamplesRoutingModule {
}
