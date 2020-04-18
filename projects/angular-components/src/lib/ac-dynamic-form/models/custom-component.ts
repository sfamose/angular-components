import {ControlValueAccessor, FormGroup} from '@angular/forms';
import {AcGroupConfig} from './group-config';
import {AcTextConfig} from './text-config';
import {AcFieldConfig} from './field-config';
import {AcField} from './field';

export class AcCustomComponentField implements AcField, ControlValueAccessor {
  field: AcFieldConfig | AcTextConfig | AcGroupConfig;
  group?: FormGroup;

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
