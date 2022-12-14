import {Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {Sort} from '@angular/material/sort';
import {AcTableOptions} from '../models/ac-table-options';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../models/ac-table-labels';
import {takeUntil} from 'rxjs/operators';
import {EditRowService} from '../services/edit-row.service';
import {Subject} from 'rxjs';
import {AcTableConversions} from '../models/ac-table-conversions';
import {StoreService} from '../services/store.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDrawer, MatDrawerMode} from '@angular/material/sidenav';
import {FilterEvent} from '../models/filter-event';
import {TableContentComponent} from '../components/table-content/table-content.component';

@Component({
  selector: 'ac-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [StoreService, EditRowService]
})
export class AcTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rows: any[];
  @Input() rowsLength: number;
  @Input() pageIndex: number;
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Input() conversionMap: AcTableConversions;
  @Input() filterSidenavMode: MatDrawerMode;
  @Input() initialFilterValues: { [key: string]: { value: any; } };
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() rowAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() openEditRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() filterChange: EventEmitter<{ [key: string]: FilterEvent }> = new EventEmitter<{ [key: string]: FilterEvent }>();
  @Output() columnChange: EventEmitter<AcTableColumn[]> = new EventEmitter<AcTableColumn[]>();
  unsubscribe$: Subject<void> = new Subject<void>();
  sidenavView: 'filter' | 'column';
  @ViewChild('tableContentComponent') tableContentComponent: TableContentComponent;

  constructor(@Inject(LABELS) public labels: AcTableLabels,
              private storeService: StoreService,
              private editService: EditRowService) {
  }

  ngOnInit(): void {
    this.editService.getEditEvent().pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event.event === 'add') {
        this.rowAdd.emit(event.row);
      } else if (event.event === 'update') {
        this.rowEdit.emit(event.row);
      } else if (event.event === 'delete') {
        this.rowDelete.emit(event.row);
      } else if (event.event === 'open-update') {
        this.openEditRow.emit(event.row);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.storeService.setOptions(this.options);
    }
    if (changes.conversionMap) {
      this.storeService.setConversionMap(this.conversionMap);
    }
    if (changes.columns) {
      this.storeService.setColumns(this.columns);
    }
    if (changes.rows) {
      this.storeService.setRows(this.rows);
    }
    if (changes.rowsLength) {
      this.storeService.setRowsLength(this.rowsLength);
    }
    if (changes.initialFilterValues) {
      this.storeService.setInitialFilterValues(this.initialFilterValues);
    }

    if (!this.filterSidenavMode
      && this.options
      && this.options.sidenavOptions) {
      this.filterSidenavMode = this.options.sidenavOptions.mode;
    }
  }

  onSortChange(sort: Sort): void {
    this.sortChange.emit(sort);
  }

  onSelectChange(selectedRows: any[]): void {
    this.selectChange.emit(selectedRows);
  }

  onPageChange(page: PageEvent): void {
    this.pageChange.emit(page);
  }

  onFilterChange(filters: { [key: string]: FilterEvent }): void {
    this.filterChange.emit(filters);
  }

  openAddForm(initialValues?: any): void {
    this.editService.openAddForm(initialValues);
  }

  firstPage(): void {
    this.tableContentComponent.paginator.firstPage();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openFilter(drawer: MatDrawer) {
    if (!drawer.opened || this.sidenavView === 'filter') {
      drawer.toggle();
    }
    this.sidenavView = 'filter';
  }

  openColumn(drawer: MatDrawer) {
    if (!drawer.opened || this.sidenavView === 'column') {
      drawer.toggle();
    }
    this.sidenavView = 'column';
  }

  onColumnChange() {
    this.columnChange.emit(this.storeService.columns);
  }
}
