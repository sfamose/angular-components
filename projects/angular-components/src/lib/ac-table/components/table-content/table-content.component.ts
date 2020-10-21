import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {MatSort, Sort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {EditRowService} from '../../services/edit-row.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StoreService} from '../../services/store.service';
import {Subject} from 'rxjs';
import {AcTableLabels} from '../../models/ac-table-labels';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'ac-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements AfterViewInit, OnDestroy {
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ViewChild('container') container: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<any>(true, []);
  unsubscribe$: Subject<void> = new Subject<void>();
  dataSource: MatTableDataSource<any>;
  rowsLength: number;

  get displayedColumns(): string[] {
    return this.storeService.displayedColumns;
  }

  get columns(): AcTableColumn[] {
    return this.storeService.columns;
  }

  get options(): AcTableOptions {
    return this.storeService.options;
  }

  get labels(): AcTableLabels {
    return this.storeService.labels;
  }

  constructor(private storeService: StoreService,
              private editService: EditRowService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.storeService.setDisplayedColumns(); // this.container.nativeElement.offsetWidth
      this.storeService.getRows$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(rows => {
          this.dataSource = new MatTableDataSource(rows);
          if (this.options && this.options.sort
            && (!this.options.sortOptions || !this.options.sortOptions.externalSort)) {
            if (this.options.sortOptions.sortingDataAccessor) {
              this.dataSource.sortingDataAccessor = this.options.sortOptions.sortingDataAccessor;
            } else {
              this.dataSource.sortingDataAccessor = (data, attribute) => {
                return data[attribute] && this.options.sortOptions.ignoreCase ? data[attribute].toLowerCase() : data[attribute];
              };
            }
            this.dataSource.sort = this.sort;
          }
          if (this.options && this.options.pagination
            && (!this.options.paginationOptions || !this.options.paginationOptions.externalPagination)) {
            this.dataSource.paginator = this.paginator;
          }
          this.rowsLength = this.storeService.rowsLength ? this.storeService.rowsLength : rows.length;

          if (this.storeService.filterValue$.value) {
            this.dataSource.filter = this.storeService.filterValue$.value;
          }
        });

      this.storeService.filterValue$.asObservable().pipe(takeUntil(this.unsubscribe$)).subscribe(filterValue => {
        this.dataSource.filter = filterValue;
      });
    }, 0);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.storeService.setDisplayedColumns();
  }

  onResize() {
    this.storeService.setDisplayedColumns();
  }

  onSortChange(sort: Sort) {
    if (this.options && this.options.sortOptions && this.options.sortOptions.sortChange) {
      const page: PageEvent = this.paginator ? {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length,
        previousPageIndex: null
      } : null;
      this.options.sortOptions.sortChange(sort, page);
    }
    this.sortChange.emit(sort);
  }

  onPageChange(page: PageEvent) {
    if (this.options && this.options.paginationOptions && this.options.paginationOptions.pageChange) {
      const sort: Sort = this.sort ? {active: this.sort.active, direction: this.sort.direction} : null;
      this.options.paginationOptions.pageChange(page, sort);
    }
    this.pageChange.emit(page);
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

  openEditForm(row: any) {
    this.editService.openEditForm(row);
  }

  openConfirmDeleteMessage(row: any) {
    this.editService.openConfirmDeleteMessage(row);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
