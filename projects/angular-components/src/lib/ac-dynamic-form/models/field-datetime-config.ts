import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {AcHint} from './hint';
import {Moment} from 'moment';
import {FormGroup} from '@angular/forms';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';

export interface AcFieldDatetimeConfig {
  type: 'datetime';
  name?: string;
  label?: string;
  value?: any;
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

  minDate?: Moment;
  maxDate?: Moment;
  filter?: (d: Moment | null, field?: AcFieldDatetimeConfig, group?: FormGroup) => boolean;
  touchUi?: boolean;

  format?: number;
  defaultTime?: string;
  minTime?: string;
  maxTime?: string;
  minutesGap?: number;
  theme?: NgxMaterialTimepickerTheme;

  onValueChanges?: (value: any, field?: AcFieldDatetimeConfig, group?: FormGroup) => void;
}
