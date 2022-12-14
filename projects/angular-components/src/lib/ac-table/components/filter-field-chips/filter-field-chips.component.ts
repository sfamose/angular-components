import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AcTableFilterField} from '../../models/ac-table-filter-field';
import {AcTableFilterFieldConfig} from '../../models/ac-table-filter-field-config';
import {FilterEvent} from '../../models/filter-event';
import {Subject} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'ac-filter-field-chips',
  templateUrl: './filter-field-chips.component.html',
  styleUrls: ['./filter-field-chips.component.scss']
})
export class FilterFieldChipsComponent implements OnInit, OnDestroy, AcTableFilterField {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  field: AcTableFilterFieldConfig;
  @Output() valueChange: EventEmitter<FilterEvent>;
  unsubscribe$: Subject<void> = new Subject<void>();
  values: string[];

  set value(value: any[]) {
    if (this.values !== value) {
      this.values = value;
      this.emit();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.values = this.field.value ? this.field.value : [];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const list = this.values ? [].concat(this.values) : [];
      list.push(value.trim());
      this.values = list;
    }
    if (input) {
      input.value = '';
    }
    this.emit();
  }

  remove(item: string): void {
    const index = this.values.indexOf(item);
    if (index >= 0) {
      const list = this.values ? [].concat(this.values) : [];
      list.splice(index, 1);
      this.values = list;
    }
    this.emit();
  }

  emit(): void {
    this.valueChange.emit({
      field: this.field,
      value: this.values,
      isFiltered: this.values && this.values.length !== 0
    });
  }
}
