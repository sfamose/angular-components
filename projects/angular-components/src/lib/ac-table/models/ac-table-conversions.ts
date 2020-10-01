import {PipeTransform, Type} from '@angular/core';
import {AcCell} from './ac-cell';
import {AcTableColumn} from './ac-table-column';

export interface AcTableConversions {
  pipes?: Map<string, Type<PipeTransform>>;
  components?: Map<string, Type<AcCell>>;
  buttonActions?: Map<string, (element: any, column?: AcTableColumn) => void>;
}
