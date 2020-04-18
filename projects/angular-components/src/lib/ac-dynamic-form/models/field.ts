import { FormGroup } from '@angular/forms';
import { AcFieldConfig } from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface AcField {
  field: AcFieldConfig | AcTextConfig | AcGroupConfig;
  group?: FormGroup;
}
