import {AcFieldConfig} from './field-config';
import {AcTextConfig} from './text-config';
import {AcGroupConfig} from './group-config';
import {Observable} from 'rxjs';

export interface DynamicFormModalData {
  fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  titleLabel?: string;
  initialObject: any;
  saveAction: (row: any) => Observable<any>;
}
