import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Type,
  ViewContainerRef
} from '@angular/core';
import {AcTableFilterFieldConfig} from '../models/ac-table-filter-field-config';
import {AcTableFilterField} from '../models/ac-table-filter-field';
import {FilterFieldDateComponent} from './filter-field-date/filter-field-date.component';
import {FilterFieldSelectComponent} from './filter-field-select/filter-field-select.component';
import {FilterFieldTextComponent} from './filter-field-text/filter-field-text.component';
import {FilterFieldNumberComponent} from './filter-field-number/filter-field-number.component';
import {FilterEvent} from '../models/filter-event';
import {FilterFieldChipsComponent} from './filter-field-chips/filter-field-chips.component';
import {FilterFieldCheckboxComponent} from './filter-field-checkbox/filter-field-checkbox.component';

const components: { [type: string]: Type<AcTableFilterField> } = {
  date: FilterFieldDateComponent,
  number: FilterFieldNumberComponent,
  select: FilterFieldSelectComponent,
  text: FilterFieldTextComponent,
  chips: FilterFieldChipsComponent,
  checkbox: FilterFieldCheckboxComponent
};

@Directive({
  selector: '[acFilterField]'
})
export class FilterFieldDirective implements AcTableFilterField, OnChanges, OnInit {

  @Input()
  field: AcTableFilterFieldConfig;
  @Input()
  value: any;
  @Output() valueChange: EventEmitter<FilterEvent> = new EventEmitter<FilterEvent>();

  component: ComponentRef<AcTableFilterField>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.value = this.value;
    }
  }

  ngOnInit() {
    if (!components[this.field.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<AcTableFilterField>(components[this.field.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.valueChange = this.valueChange;
  }


}
