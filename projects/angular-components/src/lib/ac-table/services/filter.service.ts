import {Injectable} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {AcTableFilterFieldConfig} from '../models/ac-table-filter-field-config';
import {FilterEvent} from '../models/filter-event';
import {ToolsService} from './tools.service';
import {AcTableOptions} from '../models/ac-table-options';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private toolsService: ToolsService) {
  }

  getFilters(columns: AcTableColumn[], options: AcTableOptions, initialValues: any): AcTableFilterFieldConfig[] {
    let list: AcTableFilterFieldConfig[] = columns.filter(x => x.filterable).map(x => {
      const field: any = {type: 'text', key: x.key, label: x.label, label2: x.label, labelTitle: x.label};
      if (x.filterField) {
        Object.assign(field, x.filterField);
      }
      return field as AcTableFilterFieldConfig;
    });
    if (options && options.filterOptions && options.filterOptions.additionalfilters) {
      list = list.concat(options.filterOptions.additionalfilters);
    }

    for (const field of list) {
      if (initialValues && initialValues[field.key]) {
        field.value = initialValues[field.key].value;
        field.value2 = initialValues[field.key].value2;
      }
    }
    return list;
  }

  isFilteredRow(row: any, filterValues: { [key: string]: FilterEvent }, columns: AcTableColumn[]) {
    let isOk = false;
    const keys = Object.keys(filterValues);
    if (keys.length > 0) {
      for (const key of keys) {
        const col = columns.filter(x => x.key === key)[0];
        const value = filterValues[key].value;
        const rowValue = this.toolsService.getCellValue(row, col);
        isOk = false;
        if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
          isOk = true;
        } else if (Array.isArray(value) && value.length > 0) {
          value.forEach(x => {
            if (rowValue.indexOf(x.toString()) !== -1) {
              isOk = true;
            }
          });
        } else if (rowValue.indexOf(value.toString()) !== -1) {
          isOk = true;
        }
        if (!isOk) {
          break;
        }
      }
    } else {
      isOk = true;
    }
    return isOk;
  }

  getAppliedValues(filterValues: { [p: string]: FilterEvent }, columns: AcTableColumn[]): { code: string, label: string, value: string }[] {
    const list: { code: string, label: string, value: string }[] = [];
    if (filterValues) {
      Object.keys(filterValues).forEach(key => {
        const column = columns.filter(col => col.key === filterValues[key].field.key)[0];

        if (filterValues[key].isFiltered) {
          let val = '';
          if (filterValues[key].field.type === 'select' && filterValues[key].field.labelKey) {
            val = filterValues[key].value.map(x => x[filterValues[key].field.labelKey]);
          } else if (filterValues[key].field.type === 'date' && filterValues[key].value) {
            switch (filterValues[key].operator) {
              case 'between':
                val = '[' + filterValues[key].value.format('DD MMM YYYY') + '-'
                  + (filterValues[key].value2 ? filterValues[key].value2.format('DD MMM YYYY') : '') + ']';
                break;
              case 'equal':
                val = filterValues[key].value.format('DD MMM YYYY');
                break;
              case 'less':
                val = '< ' + filterValues[key].value.format('DD MMM YYYY');
                break;
              case 'lessOrEqual':
                val = '<= ' + filterValues[key].value.format('DD MMM YYYY');
                break;
              case 'more':
                val = '> ' + filterValues[key].value.format('DD MMM YYYY');
                break;
              case 'moreOrEqual':
                val = '>= ' + filterValues[key].value.format('DD MMM YYYY');
                break;
            }
          } else if (filterValues[key].field.type === 'checkbox') {
            val = null;
          } else {
            val = filterValues[key].value;
          }

          list.push({
            code: key,
            label: filterValues[key].field.label,
            value: val
          });
        }
      });
    }
    return list;
  }
}
