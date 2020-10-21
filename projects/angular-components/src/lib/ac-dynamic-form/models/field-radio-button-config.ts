import {AcValidator} from './validator';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

export interface AcFieldRadioButtonConfig {
  type: 'radiobutton';
  name?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  validations?: AcValidator[];
  className?: string | string[];

  color?: ThemePalette;
  options?: any[];
  asyncOptions?: Observable<any[]>;
  labelKey?: string;
  valueKey?: string;
  disabledKey?: string;
  colorKey?: string;

  onValueChanges?: (value: any, field?: AcFieldRadioButtonConfig, group?: FormGroup) => void;
}
