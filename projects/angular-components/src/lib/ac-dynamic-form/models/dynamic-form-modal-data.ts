import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';

export interface DynamicFormModalData {
  fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  titleLabel?: string;
}
