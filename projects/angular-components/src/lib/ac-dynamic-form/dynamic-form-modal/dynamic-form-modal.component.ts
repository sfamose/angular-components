import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DynamicFormModalData} from '../models/dynamic-form-modal-data';
import {AcDynamicForm} from '../models/dynamic-form';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'ac-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.css']
})
export class DynamicFormModalComponent implements OnInit, OnDestroy {
  config: AcDynamicForm;
  titleLabel: string;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  error: string;
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
    this.submitButtonLabel = this.data.submitButtonLabel ? this.data.submitButtonLabel : 'Save';
    this.cancelButtonLabel = this.data.cancelButtonLabel ? this.data.cancelButtonLabel : 'Cancel';
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

}
