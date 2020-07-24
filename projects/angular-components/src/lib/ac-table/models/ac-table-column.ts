import {PipeTransform, Type} from '@angular/core';
import {AcCell} from './ac-cell';
import {AcTableButton} from './ac-table-button';
import {AcFieldConfig} from '../../ac-dynamic-form/models/field-config';

export interface AcTableColumn {
  key: string;
  label?: string;
  className?: string | string[];
  headerClassName?: string | string[];
  sticky?: 'start' | 'end';
  visibleIfMinWidth?: number;
  visibleIfMaxWidth?: number;
  hide?: boolean;
  pipe?: {
    token: Type<PipeTransform>;
    args?: any[];
  };
  sort?: {
    arrowPosition?: 'before' | 'after';
    disabled?: boolean;
    disableClear?: boolean;
    start?: 'asc' | 'desc';
  };
  component?: Type<AcCell>;
  attributeKey?: string;
  buttons?: AcTableButton[];

  addable?: boolean;
  editable?: boolean;
  field?: AcFieldConfig;
}
