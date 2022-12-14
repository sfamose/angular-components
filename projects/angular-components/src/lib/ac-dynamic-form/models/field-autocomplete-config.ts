import {AcValidator} from './validator';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcHint} from './hint';
import {AcAffix} from './affix';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface AcFieldAutocompleteConfig {
  type: 'autocomplete';
  name?: string;
  label?: string;
  value?: boolean;
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
  labelKey?: string;
  valueKey?: string;
  matchOption?: boolean;

  externalFilteredOptions?: (value: any, field?: AcFieldAutocompleteConfig, group?: FormGroup) => Observable<any[]>;
  data?: any;

  onValueChanges?: (value: any, field?: AcFieldAutocompleteConfig, group?: FormGroup, fields?: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) => void;
}
