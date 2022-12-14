import {AcTableFilterFieldConfig} from './ac-table-filter-field-config';
import {EventEmitter} from '@angular/core';

export interface AcTableFilterField {
  field: AcTableFilterFieldConfig;
  value: any;
  valueChange: EventEmitter<any>;
}
