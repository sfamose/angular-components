import {AcFieldConfig} from './field-config';
import {FormGroup} from '@angular/forms';

export interface AcHint {
  label?: string;
  action?: (field: AcFieldConfig, group: FormGroup) => void;
  actionAriaLabel?: string;
}
