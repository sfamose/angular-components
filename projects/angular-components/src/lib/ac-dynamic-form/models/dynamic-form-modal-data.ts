import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';
import {Observable} from 'rxjs';
import {ThemePalette} from '@angular/material/core';
import {AcButton} from '../../ac-button/ac-button';

export interface DynamicFormModalData {
  fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];
  submitButton?: AcButton;
  cancelButton?: AcButton;
  titleLabel?: string;
  initialObject: any;
  saveAction: (row: any) => Observable<any>;
}
