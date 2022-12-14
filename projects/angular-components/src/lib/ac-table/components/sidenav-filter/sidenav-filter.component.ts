import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {StoreService} from '../../services/store.service';
import {AcTableLabels} from '../../models/ac-table-labels';
import {AcDynamicFormComponent} from '../../../ac-dynamic-form/dynamic-form/dynamic-form.component';
import {Subject} from 'rxjs';
import {FilterService} from '../../services/filter.service';
import {FilterEvent} from '../../models/filter-event';
import {AcTableFilterFieldConfig} from '../../models/ac-table-filter-field-config';

@Component({
  selector: 'ac-sidenav-filter',
  templateUrl: './sidenav-filter.component.html',
  styleUrls: ['./sidenav-filter.component.scss']
})
export class SidenavFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() filterChange: EventEmitter<{ [key: string]: FilterEvent }> = new EventEmitter<{ [key: string]: FilterEvent }>();
  @Output() closeFilter: EventEmitter<void> = new EventEmitter<void>();
  fields: AcTableFilterFieldConfig[];
  @ViewChild('dynamicForm') dynamicForm: AcDynamicFormComponent;
  appliedValues: { code: string, label: string, value: string }[];
  private unsubcribe$: Subject<void> = new Subject<void>();

  get labels(): AcTableLabels {
    return this.storeService.labels;
  }

  get filterValues(): { [key: string]: FilterEvent } {
    return this.storeService.filterValues;
  }

  constructor(private storeService: StoreService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.fields = this.filterService.getFilters(this.columns, this.options, this.storeService.filterValues);
    this.appliedValues = this.filterService.getAppliedValues(this.storeService.filterValues, this.columns);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  deleteValues(): void {
    this.storeService.deleteFilter();
  }

  deleteValue(item: { code: string; label: string; value: string }) {
    this.storeService.removeFilter(item.code);
  }

  close() {
    this.closeFilter.emit();
  }

  onValueChange(value: FilterEvent) {
    this.storeService.addFilter(value);
    this.filterChange.emit(this.storeService.filterValues);
    this.appliedValues = this.filterService.getAppliedValues(this.storeService.filterValues, this.columns);
  }
}
