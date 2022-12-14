import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AcTableFilterField} from '../../models/ac-table-filter-field';
import {AcTableFilterFieldConfig} from '../../models/ac-table-filter-field-config';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {FilterEvent} from '../../models/filter-event';

@Component({
  selector: 'ac-filter-field-number',
  templateUrl: './filter-field-number.component.html',
  styleUrls: ['./filter-field-number.component.scss']
})
export class FilterFieldNumberComponent implements OnInit, OnDestroy, AcTableFilterField {

  field: AcTableFilterFieldConfig;
  @Output() valueChange: EventEmitter<FilterEvent>;
  formGroup: FormGroup;
  unsubscribe$: Subject<void> = new Subject<void>();

  set value(value: any) {
    if (value !== this.formGroup.get('value').value) {
      this.formGroup.get('value').setValue(value);
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      value: new FormControl(this.field.value)
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(500)).subscribe(formValue => {
      this.valueChange.emit({
        field: this.field,
        value: formValue.value,
        isFiltered: formValue.value != null && formValue.value !== ''
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  delete() {
    this.formGroup.get('value').setValue(null);
  }

}
