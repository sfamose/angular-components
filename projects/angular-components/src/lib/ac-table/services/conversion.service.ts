import {Injectable} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {AcTableConversions} from '../models/ac-table-conversions';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor() {
  }

  convertData(columnList: AcTableColumn[], conversionMap: AcTableConversions) {
    columnList.forEach(column => {
      this.setPipe(column, conversionMap);
      this.setComponent(column, conversionMap);
      this.setButtonAction(column, conversionMap);
    });
  }

  setPipe(column: AcTableColumn, conversionMap: AcTableConversions) {
    if (column.pipe && column.pipe.tokenName) {
      if (!conversionMap || !conversionMap.pipes) {
        throw new Error(
          `No conversionMap for pipe`
        );
      }
      column.pipe.token = conversionMap.pipes.get(column.pipe.tokenName);
    }
  }

  setComponent(column: AcTableColumn, conversionMap: AcTableConversions) {
    if (column.componentName) {
      if (!conversionMap || !conversionMap.components) {
        throw new Error(
          `No conversionMap for components`
        );
      }
      column.component = conversionMap.components.get(column.componentName);
    }
  }

  setButtonAction(column: AcTableColumn, conversionMap: AcTableConversions) {
    if (column.buttons) {
      column.buttons.forEach(x => {
        if (x.actionName) {
          if (!conversionMap || !conversionMap.buttonActions) {
            throw new Error(
              `No conversionMap for button action`
            );
          }
          x.action = conversionMap.buttonActions.get(x.actionName);
        }
      });
    }
  }
}
