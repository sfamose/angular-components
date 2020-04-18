import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from './affix';
import {AcValidator} from './validator';
import {Observable} from 'rxjs';
import {AcHint} from './hint';
import {FormGroup} from '@angular/forms';

export interface AcFieldSelectConfig {
  type: 'select';
  name: string;
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

  options?: any[];
  asyncOptions?: Observable<any[]>;
  optionGroups?: any[];
  asyncOptionGroups?: Observable<any[]>;
  groupLabelKey?: string;
  optionsKey?: string;
  labelKey?: string;
  valueKey?: string;
  resetOption?: boolean;
  resetOptionLabel?: string;
  multiple?: boolean;
  panelClassName?: string | string[];
  compareWith?: (c1: any, c2: any) => boolean;

  onValueChanges?: (value: any, field?: AcFieldSelectConfig, group?: FormGroup) => void;
}
