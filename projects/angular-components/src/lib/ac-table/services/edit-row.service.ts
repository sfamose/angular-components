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
import {ComponentType} from '@angular/cdk/portal';

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

  sortColumn(a: AcTableColumn, b: AcTableColumn): number {
    if (a.fieldOrder && b.fieldOrder) {
      if (a.fieldOrder < b.fieldOrder) {
        return -1;
      }
      if (a.fieldOrder > b.fieldOrder) {
        return 1;
      }
      return 0;
    }
    return 0;
  }

  openAddForm(initialValues?: any) {
    const cols = this.storeService.columns
      .filter(col => !col.skipAddRow || col.skipAddRow !== 'hide');
    cols.sort(this.sortColumn);
    const fields: AcFieldConfig[] = cols.map(col => {
      const field: AcFieldConfig = this.getField(col, col.skipAddRow === 'disabled');
      if (initialValues) {
        field.value = initialValues[col.key];
      }
      return field;
    });
    const component: ComponentType<any> = this.storeService.options.addRowOptions
    && this.storeService.options.addRowOptions.component ?
      this.storeService.options.addRowOptions.component : DynamicFormModalComponent;
    const dialogRef = this.dialog.open(component, {
      data: {
        fields,
        submitButton: {label: this.storeService.labels.submitButtonLabel},
        cancelButton: {label: this.storeService.labels.cancelButtonLabel},
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
    this.editEvent.next({
      event: 'open-update',
      row
    });
    const fields: AcFieldConfig[] = this.storeService.columns
      .filter(col => !col.skipEditRow || col.skipEditRow !== 'hide')
      .sort(this.sortColumn)
      .map(col => {
        const field: AcFieldConfig = this.getField(col, col.skipEditRow === 'disabled');
        field.value = row[col.key];
        return field;
      });
    const component: ComponentType<any> = this.storeService.options.addRowOptions
    && this.storeService.options.addRowOptions.component ?
      this.storeService.options.addRowOptions.component : DynamicFormModalComponent;
    const dialogRef = this.dialog.open(component, {
      data: {
        fields,
        submitButton: {label: this.storeService.labels.submitButtonLabel},
        cancelButton: {label: this.storeService.labels.cancelButtonLabel},
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
          titleLabel: this.storeService.labels.deleteModalTitleLabel,
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
