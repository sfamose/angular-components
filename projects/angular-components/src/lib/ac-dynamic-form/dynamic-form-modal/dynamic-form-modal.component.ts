import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DynamicFormModalData} from '../models/dynamic-form-modal-data';
import {AcDynamicForm} from '../models/dynamic-form';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'ac-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.scss']
})
export class DynamicFormModalComponent implements OnInit, OnDestroy {
  config: AcDynamicForm;
  titleLabel: string;
  error: string;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<DynamicFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicFormModalData) {
  }

  ngOnInit(): void {
    this.config = {
      submitButton: null,
      fields: this.data.fields
    };
    this.titleLabel = this.data.titleLabel;
    this.submitButtonLabel = this.data.submitButton ? this.data.submitButton.label : 'Save';
    this.cancelButtonLabel = this.data.cancelButton ? this.data.cancelButton.label : 'Cancel';
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  save(values: any) {
    this.error = null;
    const obj = Object.assign({}, this.data.initialObject ? this.data.initialObject : {}, values);
    if (this.data.saveAction) {
      this.data.saveAction(obj).pipe(takeUntil(this.unsubcribe$)).subscribe(
        value => {
          if (value) {
            this.dialogRef.close(value);
          }
        },
        err => {
          this.error = err;
        }
      );
    } else {
      this.dialogRef.close(obj);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
