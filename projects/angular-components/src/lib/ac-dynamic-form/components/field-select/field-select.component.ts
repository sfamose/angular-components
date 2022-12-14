import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {AcFieldSelectConfig} from '../../models/field-select-config';
import {AcAffix} from '../../models/affix';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {DynamicFormService} from '../../services/dynamic-form.service';

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
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType,
    private dynamicFormService: DynamicFormService
  ) {
  }

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group, this.dynamicFormService.getFields()));
    }
    if (this.field.asyncOptions) {
      this.field.asyncOptions.pipe(takeUntil(this.unsubcribe$))
        .subscribe(options => this.field.options = [].concat(options));
    }
    if (this.field.asyncOptionGroups) {
      this.field.asyncOptionGroups.pipe(takeUntil(this.unsubcribe$))
        .subscribe(optionGroups => this.field.optionGroups = [].concat(optionGroups));
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

  getLabel(item: any) {
    if (this.field.getLabel) {
      return this.field.getLabel(item, this.field);
    } else if (this.field.labelKey) {
      return item[this.field.labelKey];
    } else {
      return item;
    }
  }
}
