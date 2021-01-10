import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {AcFieldSelectConfig} from '../../models/field-select-config';
import {AcAffix} from '../../models/affix';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'ac-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.scss']
})
export class FieldSelectComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldSelectConfig;
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

  buttonAction(event: MouseEvent, b: AcAffix) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }

  compareWith(c1: any, c2: any): boolean {
    return c1 === c2;
  }
}
