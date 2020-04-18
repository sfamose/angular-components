import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {FormGroup} from '@angular/forms';

export interface AcGroupConfig {
  type: 'group';
  name: string;
  label?: string;
  className?: string | string[];
  fields?: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];

  onValueChanges?: (value: any, group?: FormGroup) => void;
}
