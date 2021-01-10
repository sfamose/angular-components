import {Component, Inject, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {AcFieldChipsInputConfig} from '../../models/field-chips-input-config';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL, SEPARATOR_KEY_CODE} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'ac-field-chips-input',
  templateUrl: './field-chips-input.component.html',
  styleUrls: ['./field-chips-input.component.scss']
})
export class FieldChipsInputComponent implements OnInit, AcField {
  field: AcFieldChipsInputConfig;
  group: FormGroup;

  get values() {
    return this.group.get(this.field.name).value;
  }
  set values(values: any[]) {
    this.group.get(this.field.name).setValue(values);
  }

  constructor(
    @Inject(SEPARATOR_KEY_CODE) public separatorKeysCodes: number[],
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType
  ) {
  }

  ngOnInit(): void {
    this.field.separatorKeysCodes = this.field.separatorKeysCodes || this.separatorKeysCodes;

    if (!this.values) {
      this.values = [];
    }
  }

  buttonAction(event: MouseEvent, b: AcAffix | AcHint) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const list = this.values || [];
      list.push(value.trim());
      this.values = list;
    }
    if (input) {
      input.value = '';
    }
  }

  remove(item: string): void {
    const index = this.values.indexOf(item);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.values = this.values;
    }
  }

}
