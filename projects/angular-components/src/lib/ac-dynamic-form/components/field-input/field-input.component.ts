import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {INPUT_MAXLENGTH, MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcFieldInputConfig} from '../../models/field-input-config';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicFormService} from '../../services/dynamic-form.service';

@Component({
  selector: 'ac-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss']
})
export class FieldInputComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldInputConfig;
  group: FormGroup;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(INPUT_MAXLENGTH) public maxlength: number,
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType,
    private dynamicFormService: DynamicFormService
  ) {
  }

  ngOnInit(): void {
    this.field.maxlength = this.field.maxlength || this.maxlength;

    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group, this.dynamicFormService.getFields()));
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  buttonAction(event: MouseEvent, b: AcAffix | AcHint) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }
}
