import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AcTableFilterField} from '../../models/ac-table-filter-field';
import {AcTableFilterFieldConfig} from '../../models/ac-table-filter-field-config';
import {Subject} from 'rxjs';
import {MatSelectionList} from '@angular/material/list';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {FilterEvent} from '../../models/filter-event';

@Component({
  selector: 'ac-filter-field-select',
  templateUrl: './filter-field-select.component.html',
  styleUrls: ['./filter-field-select.component.scss']
})
export class FilterFieldSelectComponent implements OnInit, OnDestroy, AfterViewInit, AcTableFilterField {

  field: AcTableFilterFieldConfig;
  @Output() valueChange: EventEmitter<FilterEvent>;
  @ViewChild('select') select: MatSelectionList;
  unsubscribe$: Subject<void> = new Subject<void>();
  afterInit = false;

  set value(value: any) {
    if (!value) {
      this.select.selectAll();
      this.emit();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    if (this.field.asyncOptions) {
      this.field.asyncOptions.pipe(takeUntil(this.unsubscribe$))
        .subscribe(options => this.field.options = [].concat(options));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.field.value) {
        this.select.selectAll();
      }
      this.select.selectionChange.pipe(debounceTime(500)).subscribe(x => {
        this.emit();
      });
      this.afterInit = true;
    });
  }

  masterToggle() {
    const resp = this.isAllSelected() ? this.select.deselectAll() : this.select.selectAll();
    this.emit();
    return resp;
  }

  isAllSelected() {
    return this.field.options && this.select.selectedOptions.selected.length === this.field.options.length;
  }

  emit(): void {
    this.valueChange.emit({
      field: this.field,
      value: this.select.selectedOptions.selected.map(x => x.value),
      isFiltered: !this.isAllSelected()
    });
  }
}
