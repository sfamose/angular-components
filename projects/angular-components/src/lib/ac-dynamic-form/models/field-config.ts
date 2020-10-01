import {AcFieldDateConfig} from './field-date-config';
import {AcFieldDatetimeConfig} from './field-datetime-config';
import {AcFieldInputConfig} from './field-input-config';
import {AcFieldRadioButtonConfig} from './field-radio-button-config';
import {AcFieldSelectConfig} from './field-select-config';
import {AcFieldTextareaConfig} from './field-textarea-config';
import {AcFieldTimeConfig} from './field-time-config';
import {AcFieldCheckboxConfig} from './field-checkbox-config';
import {AcFieldCustomConfig} from './field-custom-config';
import {AcFieldAutocompleteConfig} from './field-autocomplete-config';

export type AcFieldConfig =
  AcFieldAutocompleteConfig |
  AcFieldCheckboxConfig |
  AcFieldDateConfig |
  AcFieldDatetimeConfig |
  AcFieldInputConfig |
  AcFieldRadioButtonConfig |
  AcFieldSelectConfig |
  AcFieldTextareaConfig |
  AcFieldTimeConfig |
  AcFieldCustomConfig;
