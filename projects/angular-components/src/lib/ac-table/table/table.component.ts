import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AcTableColumn} from '../models/ac-table-column';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AcTableOptions} from '../models/ac-table-options';
import {SelectionModel} from '@angular/cdk/collections';
import {AcFieldConfig} from '../../ac-dynamic-form/models/field-config';
import {DynamicFormModalComponent} from '../../ac-dynamic-form/dynamic-form-modal/dynamic-form-modal.component';
import {DynamicFormModalData} from '../../ac-dynamic-form/models/dynamic-form-modal-data';
import {MatDialog} from '@angular/material/dialog';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../config/ac-table-config';
import {take} from 'rxjs/operators';
import {ConfirmationData} from '../models/confirmation-data';
import {ConfirmationModalComponent} from '../components/confirmation-modal/confirmation-modal.component';

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
  @Output() rowAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDelete: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('container', {static: true}) container: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  editButtonLabel: string;
  deleteButtonLabel: string;

  constructor(public dialog: MatDialog, @Inject(LABELS) public labels: AcTableLabels) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDisplayedColumns();

    if (this.options && this.options.editRow) {
      this.editButtonLabel = this.options.editRow.editButtonLabel ?
        this.options.editRow.editButtonLabel : this.labels.editButtonLabel;
    }
    if (this.options && this.options.deleteRow) {
      this.deleteButtonLabel = this.options.deleteRow.deleteButtonLabel ?
        this.options.deleteRow.deleteButtonLabel : this.labels.deleteButtonLabel;
    }
    this.setDatasource();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setDisplayedColumns();
    }, 0);
  }

  setDatasource() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    this.dataSource.sort = this.sort;
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

    if (this.options && this.options.editRow) {
      cols.push('editRow');
    }
    if (this.options && this.options.deleteRow) {
      cols.push('deleteRow');
    }
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

  addRow(row: any) {
    this.dataSource = new MatTableDataSource(this.rows);
    if (this.options.addRow.action) {
      this.options.addRow.action(row).pipe(take(1)).subscribe(x => {
        this.addRowSuccess(x);
      });
    } else {
      this.addRowSuccess(row);
    }
  }

  addRowSuccess(row: any) {
    this.rows.push(row);
    this.setDatasource();
    this.rowAdd.emit(row);
  }

  openEditForm(row: any) {
    const fields: AcFieldConfig[] = this.columns.filter(x => x.editable).map(x => {
      let field: any = {};
      if (x.field) {
        Object.assign(field, x.field);
      } else {
        field = {type: 'input', name: x.key, label: x.label};
      }
      field.value = row[x.key];
      return field as AcFieldConfig;
    });
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      data: {
        fields,
        submitButtonLabel: this.options.editRow.submitButtonLabel ? this.options.editRow.submitButtonLabel : this.labels.submitButtonLabel,
        cancelButtonLabel: this.options.editRow.cancelButtonLabel ? this.options.editRow.cancelButtonLabel : this.labels.cancelButtonLabel,
        titleLabel: this.options.editRow.modalTitleLabel ? this.options.editRow.modalTitleLabel : this.labels.editModalTitleLabel,
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRow(row, result);
      }
    });
  }

  editRow(row: any, editedValues: any) {
    if (this.options.editRow.action) {
      const data = {};
      Object.assign(data, row, editedValues);
      this.options.editRow.action(data).pipe(take(1)).subscribe(x => {
        this.editRowSuccess(row, x);
      });
    } else {
      this.editRowSuccess(row, editedValues);
    }
  }

  editRowSuccess(row: any, editedValues: any) {
    Object.assign(row, editedValues);
    this.setDatasource();
    this.rowEdit.emit(row);
  }

  openConfirmDeleteMessage(row: any) {
    if (this.options.deleteRow.confirmation) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          submitButtonLabel: this.options.deleteRow.submitButtonLabel ?
            this.options.deleteRow.submitButtonLabel : this.labels.submitButtonLabel,
          cancelButtonLabel: this.options.deleteRow.cancelButtonLabel ?
            this.options.deleteRow.cancelButtonLabel : this.labels.cancelButtonLabel,
          confirmMessage: this.options.deleteRow.confirmationMessage ?
            this.options.deleteRow.confirmationMessage : this.labels.deleteConfirmationMessage,
        } as ConfirmationData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteRow(row);
        }
      });
    } else {
      this.deleteRow(row);
    }
  }

  deleteRow(row: any) {
    if (this.options.deleteRow.action) {
      this.options.deleteRow.action(row).pipe(take(1)).subscribe(x => {
        this.deleteRowSuccess(row);
      });
    } else {
      this.deleteRowSuccess(row);
    }
  }

  deleteRowSuccess(row: any) {
    this.rows.splice(this.rows.indexOf(row), 1);
    this.setDatasource();
    this.rowDelete.emit(row);
  }
}
