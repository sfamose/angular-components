import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {AcHint} from './hint';
import {FormGroup} from '@angular/forms';

export interface AcFieldTextareaConfig {
  type: 'textarea';
  name: string;
  label?: string;
  value?: string;
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

  readonly?: boolean;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;

  onValueChanges?: (value: any, field?: AcFieldTextareaConfig, group?: FormGroup) => void;
}
