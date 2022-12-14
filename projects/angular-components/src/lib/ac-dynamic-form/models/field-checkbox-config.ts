import {AcValidator} from './validator';
import {FormGroup} from '@angular/forms';
import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface AcFieldCheckboxConfig {
  type: 'checkbox';
  name?: string;
  label?: string;
  value?: boolean;
  disabled?: boolean;
  validations?: AcValidator[];
  className?: string | string[];

  onValueChanges?: (value: any, field?: AcFieldCheckboxConfig, group?: FormGroup, fields?: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) => void;
}
