import {Injectable} from '@angular/core';
import {AcFieldConfig} from '../../ac-dynamic-form/models/field-config';
import {DynamicFormModalComponent} from '../../ac-dynamic-form/dynamic-form-modal/dynamic-form-modal.component';
import {DynamicFormModalData} from '../../ac-dynamic-form/models/dynamic-form-modal-data';
import {take} from 'rxjs/operators';
import {ConfirmationModalComponent} from '../components/confirmation-modal/confirmation-modal.component';
import {ConfirmationData} from '../models/confirmation-data';
import {MatDialog} from '@angular/material/dialog';
import {EditEvent} from '../models/edit-event';
import {Observable, Subject} from 'rxjs';
import {StoreService} from './store.service';
import {AcTableColumn} from '../models/ac-table-column';

@Injectable({
  providedIn: 'any'
})
export class EditRowService {

  editEvent: Subject<EditEvent> = new Subject<EditEvent>();

  constructor(public dialog: MatDialog,
              private storeService: StoreService) {
  }

  getEditEvent(): Observable<EditEvent> {
    return this.editEvent.asObservable();
  }

  getField(col: AcTableColumn, disabled: boolean): AcFieldConfig {
    let field = {};
    if (col.field) {
      Object.assign(field, {name: col.key, label: col.label}, col.field);
    } else {
      field = {type: 'input', name: col.key, label: col.label};
    }
    (field as AcFieldConfig).disabled = disabled || (field as AcFieldConfig).disabled;
    return field as AcFieldConfig;
  }

  openAddForm() {
    const fields: AcFieldConfig[] = this.storeService.columns.filter(col => !col.skipAddRow || col.skipAddRow !== 'hide').map(col => {
      return this.getField(col, col.skipAddRow === 'disabled');
    });
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      data: {
        fields,
        submitButtonLabel: this.storeService.labels.submitButtonLabel,
        cancelButtonLabel: this.storeService.labels.cancelButtonLabel,
        titleLabel: this.storeService.labels.addModalTitleLabel,
        saveAction: this.storeService.options.addRowOptions ? this.storeService.options.addRowOptions.action : null,
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRow(result);
      }
    });
  }

  addRow(row: any) {
    this.storeService.addRow(row);
    this.editEvent.next({
      event: 'add',
      row
    });
  }

  openEditForm(row: any) {
    const fields: AcFieldConfig[] = this.storeService.columns.filter(col => !col.skipEditRow || col.skipEditRow !== 'hide').map(col => {
      const field: AcFieldConfig = this.getField(col, col.skipEditRow === 'disabled');
      field.value = row[col.key];
      return field;
    });
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      data: {
        fields,
        submitButtonLabel: this.storeService.labels.submitButtonLabel,
        cancelButtonLabel: this.storeService.labels.cancelButtonLabel,
        titleLabel: this.storeService.labels.editModalTitleLabel,
        saveAction: this.storeService.options.editRowOptions ? this.storeService.options.editRowOptions.action : null,
        initialObject: row
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRow(row, result);
      }
    });
  }

  editRow(row: any, updatedRow: any) {
    this.storeService.editRow(row, updatedRow);
    this.editEvent.next({
      event: 'update',
      row: updatedRow
    });
  }

  openConfirmDeleteMessage(row: any) {
    if (this.storeService.options.deleteRowOptions
      && this.storeService.options.deleteRowOptions.confirmation) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confirmButtonLabel: this.storeService.labels.confirmButtonLabel,
          cancelButtonLabel: this.storeService.labels.cancelButtonLabel,
          confirmMessage: this.storeService.labels.deleteConfirmationMessage,
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
    if (this.storeService.options.deleteRowOptions && this.storeService.options.deleteRowOptions.action) {
      this.storeService.options.deleteRowOptions.action(row).pipe(take(1)).subscribe(x => {
        this.deleteRowSuccess(row);
      });
    } else {
      this.deleteRowSuccess(row);
    }
  }

  deleteRowSuccess(row: any) {
    this.storeService.deleteRow(row);
    this.editEvent.next({
      event: 'delete',
      row
    });
  }
}
