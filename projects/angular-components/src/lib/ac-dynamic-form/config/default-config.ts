import {InjectionToken} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export const SEPARATOR_KEY_CODE = new InjectionToken<string>('SEPARATOR_KEY_CODE');
export const MAT_FORM_FIELD_APPEARANCE = new InjectionToken<string>('MAT_FORM_FIELD_APPEARANCE');
export const MAT_FORM_FIELD_FLOATLABEL = new InjectionToken<string>('MAT_FORM_FIELD_FLOATLABEL');
export const INPUT_MAXLENGTH = new InjectionToken<string>('INPUT_MAXLENGTH');

export const DEFAULT_INPUT_MAXLENGTH = 254;
export const DEFAULT_MAT_FORM_FIELD_APPEARANCE = 'standard';
export const DEFAULT_MAT_FORM_FIELD_FLOATLABEL = 'auto';
export const DEFAULT_SEPARATOR_KEY_CODE: number[] = [ENTER, COMMA];
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_DATE_FORMAT = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
