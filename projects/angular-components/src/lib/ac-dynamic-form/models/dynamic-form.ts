import {AcSubmitButton} from './submit-button';
import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface AcDynamicForm {
  fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];
  submitButton?: AcSubmitButton;
}
