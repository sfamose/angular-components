import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {AcFieldTimeConfig} from '../../models/field-time-config';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'ac-field-time',
  templateUrl: './field-time.component.html',
  styleUrls: ['./field-time.component.scss']
})
export class FieldTimeComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldTimeConfig;
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
