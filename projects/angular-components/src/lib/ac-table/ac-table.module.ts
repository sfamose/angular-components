import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {AcPipeModule} from '../ac-pipe/ac-pipe.module';
import {CustomCellDirective} from './components/custom-cell.directive';
import {MaterialModule} from '../material.module';
import {TableCellComponent} from './components/table-cell/table-cell.component';
import {TableHeaderComponent} from './components/table-header/table-header.component';
import {AcDynamicFormModule} from '../ac-dynamic-form/ac-dynamic-form.module';
import {DEFAULT_LABELS, LABELS} from './config/default-config';
import {AcTableConfig} from './config/ac-table-config';
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
  DEFAULT_DATE_FORMAT, DEFAULT_INPUT_MAXLENGTH,
  DEFAULT_LOCALE,
  DEFAULT_MAT_FORM_FIELD_APPEARANCE, DEFAULT_MAT_FORM_FIELD_FLOATLABEL, INPUT_MAXLENGTH,
  MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL
} from '../ac-dynamic-form/config/default-config';


@NgModule({
  declarations: [TableComponent, CustomCellDirective, TableCellComponent, TableHeaderComponent, ConfirmationModalComponent],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AcPipeModule,
    AcDynamicFormModule
  ],
  providers: [
    {
      provide: LABELS,
      useValue: DEFAULT_LABELS
    }
  ]
})
export class AcTableModule {
  static setConfig(config: AcTableConfig): ModuleWithProviders<AcTableModule> {
    if (!config.dynamicForm) {
      config.dynamicForm = {};
    }
    return {
      ngModule: AcTableModule,
      providers: [
        {
          provide: LABELS,
          useValue: config.labels ? config.labels : DEFAULT_LABELS
        },
        {provide: MAT_DATE_LOCALE, useValue: config.dynamicForm.locale ? config.dynamicForm.locale : DEFAULT_LOCALE},
        {provide: MAT_DATE_FORMATS, useValue: config.dynamicForm.dateFormat ? config.dynamicForm.dateFormat : DEFAULT_DATE_FORMAT},
        {
          provide: MAT_FORM_FIELD_APPEARANCE,
          useValue: config.dynamicForm.matFormFieldAppearance ?
            config.dynamicForm.matFormFieldAppearance : DEFAULT_MAT_FORM_FIELD_APPEARANCE
        },
        {
          provide: MAT_FORM_FIELD_FLOATLABEL,
          useValue: config.dynamicForm.matFormFieldFloatlabel ?
            config.dynamicForm.matFormFieldFloatlabel : DEFAULT_MAT_FORM_FIELD_FLOATLABEL
        },
        {
          provide: INPUT_MAXLENGTH,
          useValue: config.dynamicForm.inputMaxlength ? config.dynamicForm.inputMaxlength : DEFAULT_INPUT_MAXLENGTH
        }
      ]
    };
  }
}
