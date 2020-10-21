import {Inject, Injectable} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {AcTableOptions} from '../models/ac-table-options';
import {AcTableConversions} from '../models/ac-table-conversions';
import {ConversionService} from './conversion.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../models/ac-table-labels';

@Injectable({
  providedIn: 'any'
})
export class StoreService {
  rows: any[];
  rowsLength: number;
  columns: AcTableColumn[];
  options: AcTableOptions;
  conversionMap: AcTableConversions;
  labels: AcTableLabels;
  rows$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  filterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  displayedColumns: string[];

  constructor(private conversionService: ConversionService,
              @Inject(LABELS) public defaultLabels: AcTableLabels) {
  }

  getRows$(): Observable<any[]> {
    return this.rows$.asObservable();
  }

  setRows$() {
    this.rows$.next(this.rows);
  }

  setOptions(options: AcTableOptions): void {
    this.options = options;
    this.setLabels();
  }

  setLabels() {
    this.labels = Object.assign({}, this.defaultLabels,
      this.options && this.options.labels ? this.options.labels : {});
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
      !x.hide
    ).map(x => x.key) : [];
    // width: number
    // && (!x.visibleIfMinWidth || width >= x.visibleIfMinWidth) && (!x.visibleIfMaxWidth || width <= x.visibleIfMaxWidth)

    if (this.options && this.options.editRow) {
      cols.push('editRow');
    }
    if (this.options && this.options.deleteRow) {
      cols.push('deleteRow');
    }
    this.displayedColumns = this.displayedColumns.concat(cols);
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
}
