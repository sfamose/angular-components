import {Injectable} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() {
  }

  getCellValue(row: any, column: AcTableColumn): any {
    if (!column || !row) {
      return '';
    } else if (column.getValue) {
      return column.getValue(row, column);
    } else if (column.attributeKey && row[column.key]) {
      return row[column.key][column.attributeKey];
    } else {
      return row[column.key];
    }
  }
}
