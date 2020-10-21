import {AcTableLabels} from '../models/ac-table-labels';

export interface AcTableConfig {
  labels?: AcTableLabels;
  dynamicForm?: {
    dateFormat?: {
      parse: {
        dateInput: string | string[];
      },
      display: {
        dateInput: string;
        monthYearLabel: string;
        dateA11yLabel: string;
        monthYearA11yLabel: string;
      }
    };
    locale?: string;
    matFormFieldAppearance?: string;
    matFormFieldFloatlabel?: string;
    inputMaxlength?: number;
  };
}
