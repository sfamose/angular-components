import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {AcHint} from './hint';
import {FormGroup} from '@angular/forms';

export interface AcFieldInputConfig {

  type: 'input';
  inputType?: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' |
    'password' | 'radio' | 'range' | 'reset' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  name?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  validations?: AcValidator[];
  className?: string | string[];

  placeholder?: string;
  required?: boolean;
  appearance?: MatFormFieldAppearance;
  floatLabel?: FloatLabelType;
  hideRequiredMarker?: boolean;
  startHint?: AcHint;
  endHint?: AcHint;
  suffixes?: AcAffix[];
  prefixes?: AcAffix[];

  maxlength?: number;
  autocomplete?: string;
  readonly?: boolean;

  onValueChanges?: (value: any, field?: AcFieldInputConfig, group?: FormGroup) => void;
}

