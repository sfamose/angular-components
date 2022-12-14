
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {Moment} from 'moment';
import {AcHint} from './hint';
import {FormGroup} from '@angular/forms';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface AcFieldDateConfig {
  type: 'date';
  name?: string;
  label?: string;
  value?: Moment;
  disabled?: boolean;
  validations?: AcValidator[];
  className?: string | string[];

  placeholder?: string;
  required?: boolean;
  appearance?: MatFormFieldAppearance;
  startHint?: AcHint;
  endHint?: AcHint;
  floatLabel?: FloatLabelType;
  hideRequiredMarker?: boolean;
  suffixes?: AcAffix[];
  prefixes?: AcAffix[];

  onlyPopup?: boolean;
  autocomplete?: string;
  minDate?: Moment;
  maxDate?: Moment;
  filter?: (d: Moment | null, field?: AcFieldDateConfig, group?: FormGroup) => boolean;
  touchUi?: boolean;

  onValueChanges?: (value: any, field?: AcFieldDateConfig, group?: FormGroup, fields?: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) => void;
}
