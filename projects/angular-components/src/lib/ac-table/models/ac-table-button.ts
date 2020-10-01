import {AcTableColumn} from './ac-table-column';

export interface AcTableButton {
  label: string;
  action?: (element: any, column?: AcTableColumn) => void;
  actionName?: string;
}
