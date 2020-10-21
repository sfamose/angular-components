import {AcValidator} from './validator';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcHint} from './hint';
import {AcAffix} from './affix';
import {Observable} from 'rxjs';
import {ThemePalette} from '@angular/material/core';

export interface FieldChipsAutocompleteConfig {
  type: 'chipsAutocomplete';
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

  noSelectable?: boolean;
  noRemovable?: boolean;
  addOnBlur?: boolean;
  separatorKeysCodes?: number[];
  deleteLabel?: string;
  options?: string[];
  asyncOptions?: Observable<string[]>;
  color?: ThemePalette;
}
