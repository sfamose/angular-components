import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcFieldTextareaConfig} from '../../models/field-textarea-config';
import {AcAffix} from '../../models/affix';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicFormService} from '../../services/dynamic-form.service';

@Component({
  selector: 'ac-field-textarea',
  templateUrl: './field-textarea.component.html',
  styleUrls: ['./field-textarea.component.scss']
})
export class FieldTextareaComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldTextareaConfig;
  group: FormGroup;
  afterInit = false;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType,
    private dynamicFormService: DynamicFormService
  ) {
  }

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group, this.dynamicFormService.getFields()));
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  buttonAction(event: MouseEvent, b: AcAffix) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }
}
