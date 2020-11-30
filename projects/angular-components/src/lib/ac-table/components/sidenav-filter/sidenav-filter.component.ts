import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AcFieldConfig} from '../../../ac-dynamic-form/models/field-config';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {AcDynamicForm} from '../../../ac-dynamic-form/models/dynamic-form';
import {StoreService} from '../../services/store.service';
import {AcTableLabels} from '../../models/ac-table-labels';
import {AcDynamicFormComponent} from '../../../ac-dynamic-form/dynamic-form/dynamic-form.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-sidenav-filter',
  templateUrl: './sidenav-filter.component.html',
  styleUrls: ['./sidenav-filter.component.css']
})
export class SidenavFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  config: AcDynamicForm;
  @ViewChild('dynamicForm') dynamicForm: AcDynamicFormComponent;
  values: { code: string, label: string, value: string }[];
  private unsubcribe$: Subject<void> = new Subject<void>();

  get labels(): AcTableLabels {
    return this.storeService.labels;
  }

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    const fields: AcFieldConfig[] = this.columns.filter(x => x.filterable).map(x => {
      let field: any = {};
      if (x.filterField) {
        Object.assign(field, x.filterField);
      } else {
        field = {type: 'input', name: x.key, label: x.label};
      }
      if (this.storeService.filterValues) {
        field.value = this.storeService.filterValues[x.key];
      }
      return field as AcFieldConfig;
    });
    this.config = {
      fields,
      submitButton: this.options.filterOptions && this.options.filterOptions.submitButton,
      debounceTime: this.options.filterOptions && this.options.filterOptions.debounceTime,
      updateOn: this.options.filterOptions ? this.options.filterOptions.updateOn : 'change'
    };
  }

  ngAfterViewInit(): void {
    this.dynamicForm.form.valueChanges.pipe(takeUntil(this.unsubcribe$)).subscribe(values => {
      this.setValues(values);
    });
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  submit(values: any): void {
    Object.keys(values).forEach(key => {
      if (values[key] === null || values[key] === undefined || values[key] === '') {
        delete values[key];
      }
    });
    this.storeService.filter(Object.keys(values).length > 0 ? values : null);
    this.filterChange.emit(Object.keys(values).length > 0 ? values : null);
  }

  setValues(values: any): void {
    this.values = [];
    Object.keys(values).forEach(key => {
      const col = this.storeService.columns.filter(x => x.key === key || (x.filterField && x.filterField.name === key))[0];
      if (Array.isArray(values[key])) {
        values[key].forEach(x => {
          this.values.push({
            code: key,
            label: col.label,
            value: x
          });
        });
      } else if (values[key]) {
        this.values.push({
          code: key,
          label: col.label,
          value: values[key]
        });
      }
    });
  }

  deleteValues(): void {
    this.dynamicForm.form.reset();
  }

  deleteValue(item: { code: string; label: string; value: string }) {
    let val = this.dynamicForm.form.value[item.code];
    if (Array.isArray(val)) {
      val.splice(val.indexOf(item.value), 1);
    } else {
      val = null;
    }
    this.dynamicForm.form.get(item.code).setValue(val);
  }
}
