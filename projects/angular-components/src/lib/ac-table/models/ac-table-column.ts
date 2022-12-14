import {PipeTransform, Type} from '@angular/core';
import {AcCell} from './ac-cell';
import {AcTableButton} from './ac-table-button';
import {AcFieldConfig} from '../../ac-dynamic-form/models/field-config';
import {AcGroupConfig} from '../../ac-dynamic-form/models/group-config';
import {AcTableFilterFieldConfig} from './ac-table-filter-field-config';

export interface AcTableColumn {
  key: string;
  label?: string;
  className?: string | string[];
  headerClassName?: string | string[];
  sticky?: 'start' | 'end';
  mediaQueries?: string[];
  hide?: boolean;
  pipe?: {
    tokenName?: string;
    token?: Type<PipeTransform>;
    args?: any[];
  };
  sortOptions?: {
    arrowPosition?: 'before' | 'after';
    disabled?: boolean;
    disableClear?: boolean;
    start?: 'asc' | 'desc';
  };
  component?: Type<AcCell>;
  componentName?: string;
  attributeKey?: string;
  getValue?: (element: any, column?: AcTableColumn) => any;
  buttons?: AcTableButton[];

  skipAddRow?: 'disabled' | 'hide';
  skipEditRow?: 'disabled' | 'hide';
  field?: AcFieldConfig | AcGroupConfig;
  fieldOrder?: number;

  filterable?: boolean;
  filterField?: AcTableFilterFieldConfig;

  skipExport?: boolean;
  exportLabel?: string;
}
