import {AcValidator} from './validator';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcHint} from './hint';
import {AcAffix} from './affix';
import {ThemePalette} from '@angular/material/core';

export interface AcFieldChipsInputConfig {
  type: 'chipsInput';
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


  noSelectable?: boolean;
  noRemovable?: boolean;
  addOnBlur?: boolean;
  separatorKeysCodes?: number[];
  deleteLabel?: string;
  color?: ThemePalette;
}
