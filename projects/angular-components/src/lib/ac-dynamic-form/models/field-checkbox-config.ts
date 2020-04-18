import {AcValidator} from './validator';
import {FormGroup} from '@angular/forms';

export interface AcFieldCheckboxConfig {
  type: 'checkbox';
  name: string;
  label?: string;
  value?: boolean;
  disabled?: boolean;
  validations?: AcValidator[];
  className?: string | string[];

  onValueChanges?: (value: any, field?: AcFieldCheckboxConfig, group?: FormGroup) => void;
}
