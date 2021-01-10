import {Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
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
import {MatDrawerMode} from '@angular/material/sidenav';

@Component({
  selector: 'ac-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [StoreService, EditRowService]
})
export class AcTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rows: any[];
  @Input() rowsLength: number;
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Input() conversionMap: AcTableConversions;
  @Input() filterSidenavMode: MatDrawerMode;
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() rowAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  unsubscribe$: Subject<void> = new Subject<void>();

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

    if (!this.filterSidenavMode
      && this.options
      && this.options.filterOptions
      && this.options.filterOptions.sidenavOptions) {
      this.filterSidenavMode = this.options.filterOptions.sidenavOptions.mode;
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

  onFilterChange(filters: any) {
    this.filterChange.emit(filters);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
