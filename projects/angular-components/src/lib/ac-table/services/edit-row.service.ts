import {Inject, Injectable} from '@angular/core';
import {AcFieldConfig} from '../../ac-dynamic-form/models/field-config';
import {DynamicFormModalComponent} from '../../ac-dynamic-form/dynamic-form-modal/dynamic-form-modal.component';
import {DynamicFormModalData} from '../../ac-dynamic-form/models/dynamic-form-modal-data';
import {take} from 'rxjs/operators';
import {ConfirmationModalComponent} from '../components/confirmation-modal/confirmation-modal.component';
import {ConfirmationData} from '../models/confirmation-data';
import {MatDialog} from '@angular/material/dialog';
import {LABELS} from '../config/default-config';
import {AcTableLabels} from '../config/ac-table-config';
import {AcTableColumn} from '../models/ac-table-column';
import {AcTableOptions} from '../models/ac-table-options';
import {EditEvent} from '../models/edit-event';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class EditRowService {

  editEvent: Subject<EditEvent> = new Subject<EditEvent>();

  constructor(public dialog: MatDialog, @Inject(LABELS) public labels: AcTableLabels) {
  }

  getEditEvent(): Observable<EditEvent> {
    return this.editEvent.asObservable();
  }

  openAddForm(columns: AcTableColumn[], options: AcTableOptions) {
    const fields: AcFieldConfig[] = columns.filter(x => x.addable).map(x => {
      let field = {};
      if (x.field) {
        Object.assign(field, x.field);
      } else {
        field = {type: 'input', name: x.key, label: x.label};
      }
      return field as AcFieldConfig;
    });
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      data: {
        fields,
        submitButtonLabel: options.addRow.submitButtonLabel ? options.addRow.submitButtonLabel : this.labels.submitButtonLabel,
        cancelButtonLabel: options.addRow.cancelButtonLabel ? options.addRow.cancelButtonLabel : this.labels.cancelButtonLabel,
        titleLabel: options.addRow.modalTitleLabel ? options.addRow.modalTitleLabel : this.labels.addModalTitleLabel,
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRow(result, options);
      }
    });
  }

  addRow(row: any, options: AcTableOptions) {
    if (options.addRow.action) {
      options.addRow.action(row).pipe(take(1)).subscribe(x => {
        this.addRowSuccess(x);
      });
    } else {
      this.addRowSuccess(row);
    }
  }

  addRowSuccess(row: any) {
    this.editEvent.next({
      event: 'add',
      newRow: row
    });
  }

  openEditForm(row: any, columns: AcTableColumn[], options: AcTableOptions) {
    const fields: AcFieldConfig[] = columns.filter(x => x.editable).map(x => {
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
        submitButtonLabel: options.editRow.submitButtonLabel ? options.editRow.submitButtonLabel : this.labels.submitButtonLabel,
        cancelButtonLabel: options.editRow.cancelButtonLabel ? options.editRow.cancelButtonLabel : this.labels.cancelButtonLabel,
        titleLabel: options.editRow.modalTitleLabel ? options.editRow.modalTitleLabel : this.labels.editModalTitleLabel,
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRow(row, result, options);
      }
    });
  }

  editRow(row: any, editedValues: any, options: AcTableOptions) {
    if (options.editRow.action) {
      const data = {};
      Object.assign(data, row, editedValues);
      options.editRow.action(data).pipe(take(1)).subscribe(x => {
        this.editRowSuccess(row, x);
      });
    } else {
      this.editRowSuccess(row, editedValues);
    }
  }

  editRowSuccess(row: any, editedValues: any) {
    this.editEvent.next({
      event: 'update',
      row,
      newRow: editedValues
    });
  }

  openConfirmDeleteMessage(row: any, options: AcTableOptions) {
    if (options.deleteRow.confirmation) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          submitButtonLabel: options.deleteRow.submitButtonLabel ?
            options.deleteRow.submitButtonLabel : this.labels.submitButtonLabel,
          cancelButtonLabel: options.deleteRow.cancelButtonLabel ?
            options.deleteRow.cancelButtonLabel : this.labels.cancelButtonLabel,
          confirmMessage: options.deleteRow.confirmationMessage ?
            options.deleteRow.confirmationMessage : this.labels.deleteConfirmationMessage,
        } as ConfirmationData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteRow(row, options);
        }
      });
    } else {
      this.deleteRow(row, options);
    }
  }

  deleteRow(row: any, options: AcTableOptions) {
    if (options.deleteRow.action) {
      options.deleteRow.action(row).pipe(take(1)).subscribe(x => {
        this.deleteRowSuccess(row);
      });
    } else {
      this.deleteRowSuccess(row);
    }
  }

  deleteRowSuccess(row: any) {
    this.editEvent.next({
      event: 'delete',
      row
    });
  }
}
