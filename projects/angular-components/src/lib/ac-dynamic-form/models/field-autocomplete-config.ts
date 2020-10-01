import {AcValidator} from './validator';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcHint} from './hint';
import {AcAffix} from './affix';
import {Observable} from 'rxjs';

export interface AcFieldAutocompleteConfig {
  type: 'autocomplete';
  name: string;
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
}
