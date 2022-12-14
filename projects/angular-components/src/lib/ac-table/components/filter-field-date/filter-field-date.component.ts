import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AcTableFilterField} from '../../models/ac-table-filter-field';
import {AcTableFilterFieldConfig} from '../../models/ac-table-filter-field-config';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {FilterEvent} from '../../models/filter-event';

@Component({
  selector: 'ac-filter-field-date',
  templateUrl: './filter-field-date.component.html',
  styleUrls: ['./filter-field-date.component.scss']
})
export class FilterFieldDateComponent implements OnInit, OnDestroy, AcTableFilterField {

  field: AcTableFilterFieldConfig;
  @Output() valueChange: EventEmitter<FilterEvent>;
  formGroup: FormGroup;
  unsubscribe$: Subject<void> = new Subject<void>();
  options: { code: ('equal' | 'more' | 'moreOrEqual' | 'less' | 'lessOrEqual' | 'between'), label: string }[] = [
    {code: 'equal', label: 'Egal'},
    {code: 'less', label: 'Moins grand'},
    {code: 'lessOrEqual', label: 'Moins grand ou égal'},
    {code: 'more', label: 'Plus grand'},
    {code: 'moreOrEqual', label: 'Plus grand ou égal'},
    {code: 'between', label: 'Intervalle'},
  ];

  set value(value: any) {
    if (value !== this.formGroup.get('value').value) {
      this.formGroup.get('value').setValue(value);
      this.formGroup.get('value2').setValue(value);
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.field.operatorList) {
      this.field.operatorList = ['equal'];
    }
    this.formGroup = this.fb.group({
      value: new FormControl(this.field.value),
      value2: new FormControl(this.field.value2),
      operator: new FormControl(this.field.operatorList[0]),
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(500)).subscribe(formValue => {
      if (formValue.operator !== 'between') {
        this.formGroup.get('value2').setValue(null, {emitEvent: false});
      }
      this.valueChange.emit({
        field: this.field,
        value: formValue.value,
        isFiltered: formValue.value != null && formValue.value !== '',
        operator: formValue.operator,
        value2: formValue.value2
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  delete(controlFormName: string) {
    this.formGroup.get(controlFormName).setValue(null);
  }
}
