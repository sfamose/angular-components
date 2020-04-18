import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcFieldDatetimeConfig} from '../../models/field-datetime-config';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-field-datetime',
  templateUrl: './field-datetime.component.html',
  styleUrls: ['./field-datetime.component.css']
})
export class FieldDatetimeComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldDatetimeConfig;
  group: FormGroup;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType
  ) {
  }

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group));
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
