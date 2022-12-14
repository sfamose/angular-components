import {Observable} from 'rxjs';

export interface AcTableFilterFieldConfig {
  type: 'text' | 'select' | 'date' | 'number' | 'chips'| 'checkbox';
  key?: string;
  label?: string;
  labelTitle?: string;
  label2?: string;
  options?: any[];
  asyncOptions?: Observable<any[]>;
  labelKey?: string;
  value?: any;
  value2?: any;
  expanded?: boolean;
  operatorList?: ('equal' | 'more' | 'moreOrEqual' | 'less' | 'lessOrEqual' | 'between')[];
}
