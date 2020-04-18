import {FormGroup} from '@angular/forms';

export interface AcTextConfig {
  type: 'text';
  label: string;
  className?: string | string[];
  action?: (group: FormGroup) => void;
  actionAriaLabel?: string;
}
