import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DynamicFormModalData} from '../models/dynamic-form-modal-data';
import {AcDynamicForm} from '../models/dynamic-form';

@Component({
  selector: 'ac-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.css']
})
export class DynamicFormModalComponent implements OnInit {
  config: AcDynamicForm;
  titleLabel: string;
  submitButtonLabel: string;
  cancelButtonLabel: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: DynamicFormModalData) {
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

}
