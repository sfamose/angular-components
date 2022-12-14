import {Inject, Injectable} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {AcTableOptions} from '../models/ac-table-options';
import {AcTableConversions} from '../models/ac-table-conversions';
import {ConversionService} from './conversion.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../models/ac-table-labels';
import {AcTableHeaderItem} from '../models/ac-table-header-item';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';
import {FilterService} from './filter.service';
import {FilterEvent} from '../models/filter-event';
import {AcTableFilterFieldConfig} from '../models/ac-table-filter-field-config';

@Injectable({
  providedIn: 'any'
})
export class StoreService {
  rows: any[];
  rowsLength: number;
  columns: AcTableColumn[];
  options: AcTableOptions;
  headerItems: AcTableHeaderItem[];
  conversionMap: AcTableConversions;
  dataSource: MatTableDataSource<any>;
  labels: AcTableLabels;
  rows$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  globalFilterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterValues$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>(null);
  filterValues: { [key: string]: FilterEvent };
  displayedColumns: string[];

  constructor(private conversionService: ConversionService,
              @Inject(LABELS) private defaultLabels: AcTableLabels,
              private filterService: FilterService,
              private breakpointObserver: BreakpointObserver) {
  }

  getRows$(): Observable<any[]> {
    return this.rows$.asObservable();
  }

  setRows$() {
    if (this.filterValues && (!this.options.filterOptions || !this.options.filterOptions.externalFilter)) {
      this.rows$.next(this.rows.filter(row => this.filterService.isFilteredRow(row, this.filterValues, this.columns)));
    } else {
      this.rows$.next(this.rows);
    }
  }

  setOptions(options: AcTableOptions): void {
    this.options = options;
    this.setLabels();
    this.setHeaderItems();
  }

  setLabels() {
    this.labels = Object.assign({}, this.defaultLabels,
      this.options && this.options.labels ? this.options.labels : {});
  }

  setHeaderItems(): void {
    if (this.options.headerItems) {
      this.headerItems = this.options.headerItems.filter(x => !x.mediaQueries || this.breakpointObserver.isMatched(x.mediaQueries));
    } else {
      const list: AcTableHeaderItem[] = [];
      if (this.options.addRow) {
        list.push({type: 'addRow'});
      }
      if (this.options.filter) {
        list.push({type: 'filter'});
      }
      if (this.options.columnManagement) {
        list.push({type: 'column'});
      }
      if (this.options.exportCSV) {
        list.push({type: 'export'});
      }
      if (this.options.globalFilter) {
        list.push({type: 'globalFilter'});
      }
      this.headerItems = list;
    }
  }

  setColumns(columns: AcTableColumn[]): void {
    this.columns = columns;
    this.conversionService.convertData(this.columns, this.conversionMap);
    this.setDisplayedColumns();
  }

  setRows(rows: any[]): void {
    this.rows = rows;
    this.setRows$();
  }

  setRowsLength(rowsLength: number): void {
    this.rowsLength = rowsLength;
  }

  setConversionMap(conversionMap: AcTableConversions): void {
    this.conversionMap = conversionMap;
    if (this.columns) {
      this.conversionService.convertData(this.columns, this.conversionMap);
    }
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.options && !!this.options.selection ? ['select'] : [];
    const cols = this.columns ? this.columns.filter(x =>
      !x.hide &&
      (!x.mediaQueries || this.breakpointObserver.isMatched(x.mediaQueries))
    ).map(x => x.key) : [];

    if (this.options && this.options.editRow) {
      cols.push('editRow');
    }
    if (this.options && this.options.deleteRow) {
      cols.push('deleteRow');
    }
    this.displayedColumns = this.displayedColumns.concat(cols);
  }

  onResize(): void {
    this.setHeaderItems();
    this.setDisplayedColumns();
  }

  addRow(newRow: any): void {
    if (!this.options.externalStore) {
      this.rows.push(newRow);
      this.setRows$();
    }
  }

  editRow(row: any, newValues: any): void {
    if (!this.options.externalStore) {
      Object.assign(row, newValues);
      this.setRows$();
    }
  }

  deleteRow(row: any): void {
    if (!this.options.externalStore) {
      this.rows.splice(this.rows.indexOf(row), 1);
      this.setRows$();
    }
  }


  deleteFilter() {
    this.filterValues = null;
    this.filterValues$.next(this.filterValues);
    this.setRows$();
  }


  addFilter(event: FilterEvent) {
    if (!this.filterValues) {
      this.filterValues = {};
    }
    if (event.isFiltered) {
      this.filterValues[event.field.key] = event;
    } else {
      this.removeFilter(event.field.key);
    }
    this.filterValues$.next(this.filterValues);
    this.setRows$();
  }

  removeFilter(key: string) {
    const values = JSON.parse(JSON.stringify(this.filterValues));
    if (values && values[key]) {
      delete values[key];
      this.filterValues = values;
      setTimeout(() => {
        this.filterValues$.next(values);
      });
      this.setRows$();
    }
  }

  setInitialFilterValues(initialFilterValues: { [p: string]: { value: any; } }) {
    if (initialFilterValues) {
      const fields: AcTableFilterFieldConfig[] = this.filterService.getFilters(this.columns, this.options, initialFilterValues);

      const values: { [key: string]: FilterEvent } = {};
      Object.keys(initialFilterValues).forEach(key => {
        const item = fields.filter(x => x.key === key)[0];
        if (initialFilterValues[key] && item) {
          values[key] = {
            field: item,
            isFiltered: true,
            value: initialFilterValues[key].value

          };
        }
      });
      this.filterValues = values;
      setTimeout(() => {
        this.filterValues$.next(values);
        this.setRows$();
      });
    }

  }
}
