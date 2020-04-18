import {AcValidator} from './validator';
import {AcCustomComponentField} from './custom-component';
import {Type} from '@angular/core';

export interface AcFieldCustomConfig {
  type: 'customInput';
  name: string;
  className?: string | string[];
  value?: any;
  disabled?: boolean;
  validations?: AcValidator[];
  component: Type<AcCustomComponentField>;
  data?: any;
}
