import {AcValidator} from './validator';
import {Type} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

export interface AcFieldCustomConfig {
  type: 'customInput';
  name: string;
  className?: string | string[];
  value?: any;
  disabled?: boolean;
  validations?: AcValidator[];
  component: Type<ControlValueAccessor>;
  data?: any;
}
