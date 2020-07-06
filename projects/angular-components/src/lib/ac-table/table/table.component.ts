import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AcTableOptions} from '../models/ac-table-options';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'ac-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges, AfterViewInit {
  @Input() rows: any[];
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ViewChild('container', {static: true}) container: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDisplayedColumns();
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setDisplayedColumns();
    }, 0);
  }

  onResize() {
    this.setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.displayedColumns = this.options && !!this.options.selection ? ['select'] : [];

    const width = this.container.nativeElement.offsetWidth;
    const cols = this.columns ? this.columns.filter(x =>
      !x.hide && (!x.visibleIfMinWidth || width >= x.visibleIfMinWidth) && (!x.visibleIfMaxWidth || width <= x.visibleIfMaxWidth)
    ).map(x => x.key) : [];
    this.displayedColumns = this.displayedColumns.concat(cols);
  }

  onSortChange(sort: Sort) {
    if (this.options && this.options.sort && this.options.sort.sortChange) {
      this.options.sort.sortChange(sort);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectChange.emit(this.selection.selected);
  }

  toggle(row: any) {
    this.selection.toggle(row);
    this.selectChange.emit(this.selection.selected);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
