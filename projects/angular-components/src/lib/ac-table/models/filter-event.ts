import {AcTableFilterFieldConfig} from './ac-table-filter-field-config';

export interface FilterEvent {
  field: AcTableFilterFieldConfig;
  value: any;
  isFiltered: boolean;
  operator?: 'equal' | 'more' | 'moreOrEqual' | 'less' | 'lessOrEqual' | 'between';
  value2?: any;
}
