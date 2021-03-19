import {AcFieldDateConfig} from './field-date-config';
import {AcFieldInputConfig} from './field-input-config';
import {AcFieldRadioButtonConfig} from './field-radio-button-config';
import {AcFieldSelectConfig} from './field-select-config';
import {AcFieldTextareaConfig} from './field-textarea-config';
import {AcFieldCheckboxConfig} from './field-checkbox-config';
import {AcFieldCustomConfig} from './field-custom-config';
import {AcFieldAutocompleteConfig} from './field-autocomplete-config';
import {AcFieldChipsInputConfig} from './field-chips-input-config';
import {FieldChipsAutocompleteConfig} from './field-chips-autocomplete-config';

export type AcFieldConfig =
  AcFieldAutocompleteConfig |
  AcFieldCheckboxConfig |
  AcFieldDateConfig |
  AcFieldInputConfig |
  AcFieldRadioButtonConfig |
  AcFieldSelectConfig |
  AcFieldTextareaConfig |
  AcFieldCustomConfig |
  AcFieldChipsInputConfig |
  FieldChipsAutocompleteConfig;
