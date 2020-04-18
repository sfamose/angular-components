import {FormGroup} from '@angular/forms';
import {AcFieldConfig} from './field-config';

export interface AcAffix {
  label?: string;
  action?: (field: AcFieldConfig, group?: FormGroup) => void;
  actionAriaLabel?: string;
}
