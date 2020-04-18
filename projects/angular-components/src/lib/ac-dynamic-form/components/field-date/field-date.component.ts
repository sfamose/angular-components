import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcFieldDateConfig} from '../../models/field-date-config';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {Moment} from 'moment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatDatepicker} from '@angular/material/datepicker';


@Component({
  selector: 'ac-field-date',
  templateUrl: './field-date.component.html',
  styleUrls: ['./field-date.component.css']
})
export class FieldDateComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldDateConfig;
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

  filterDate = (d: Moment | null): boolean => {
    return this.field.filter ? this.field.filter(d, this.field, this.group) : true;
  };

  onInputClick(picker: MatDatepicker<any>) {
    if (this.field.onlyPopup) {
      picker.open();
    }
  }
}
