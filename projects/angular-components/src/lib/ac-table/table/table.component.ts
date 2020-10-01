import {Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AcTableOptions} from '../models/ac-table-options';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../config/ac-table-config';
import {takeUntil} from 'rxjs/operators';
import {EditRowService} from '../services/edit-row.service';
import {EditEvent} from '../models/edit-event';
import {Subject} from 'rxjs';
import {AcTableConversions} from '../models/ac-table-conversions';
import {ConversionService} from '../services/conversion.service';

@Component({
  selector: 'ac-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class AcTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rows: any[];
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Input() conversionMap: AcTableConversions;
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() rowAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDelete: EventEmitter<any> = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(LABELS) public labels: AcTableLabels,
              private editService: EditRowService,
              private conversionService: ConversionService) {
  }

  ngOnInit(): void {
    this.editService.getEditEvent().pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event.event === 'add') {
        this.addRow(event);
      } else if (event.event === 'update') {
        this.editRow(event);
      } else if (event.event === 'delete') {
        this.deleteRow(event);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.conversionService.convertData(this.columns, this.conversionMap);
    }
    this.setDatasource();
  }

  setDatasource() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
  }

  onSortChange(sort: Sort) {
    if (this.options && this.options.sort && this.options.sort.sortChange) {
      this.options.sort.sortChange(sort);
    }
  }

  addRow($event: EditEvent) {
    this.rows.push($event.newRow);
    this.setDatasource();
    this.rowAdd.emit($event.newRow);
  }

  editRow($event: EditEvent) {
    Object.assign($event.row, $event.newRow);
    this.setDatasource();
    this.rowEdit.emit($event.row);
  }

  deleteRow($event: any) {
    this.rows.splice(this.rows.indexOf($event.row), 1);
    this.setDatasource();
    this.rowDelete.emit($event.row);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
