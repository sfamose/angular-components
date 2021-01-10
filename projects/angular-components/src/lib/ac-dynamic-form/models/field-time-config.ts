import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {AcHint} from './hint';
import {FormGroup} from '@angular/forms';

export interface AcFieldTimeConfig {
  type: 'time';
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

  autocomplete?: string;
  format?: number;
  defaultTime?: string;
  minTime?: string;
  maxTime?: string;
  minutesGap?: number;

  onValueChanges?: (value: any, field?: AcFieldTimeConfig, group?: FormGroup) => void;
}
