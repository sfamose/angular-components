import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';

export interface AcValidator {
  name: string;
  validator?: ValidatorFn;
  asyncValidator?: AsyncValidatorFn;
  message: string;
}
