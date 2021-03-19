import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import {FieldCheckboxComponent} from './field-checkbox/field-checkbox.component';
import {AcField} from '../models/field';
import {FieldSelectComponent} from './field-select/field-select.component';
import {FieldInputComponent} from './field-input/field-input.component';
import {FieldDateComponent} from './field-date/field-date.component';
import {FieldRadioButtonComponent} from './field-radio-button/field-radio-button.component';
import {AcFieldConfig} from '../models/field-config';
import {FormGroup} from '@angular/forms';
import {FieldGroupComponent} from './field-group/field-group.component';
import {FieldTextareaComponent} from './field-textarea/field-textarea.component';
import {DivTextComponent} from './div-text/div-text.component';
import {AcTextConfig} from '../models/text-config';
import {FieldCustomComponent} from './field-custom/field-custom.component';
import {FieldAutocompleteComponent} from './field-autocomplete/field-autocomplete.component';
import {FieldChipsInputComponent} from './field-chips-input/field-chips-input.component';
import {FieldChipsAutocompleteComponent} from './field-chips-autocomplete/field-chips-autocomplete.component';

const components: { [type: string]: Type<AcField> } = {
  autocomplete: FieldAutocompleteComponent,
  checkbox: FieldCheckboxComponent,
  input: FieldInputComponent,
  select: FieldSelectComponent,
  date: FieldDateComponent,
  radiobutton: FieldRadioButtonComponent,
  group: FieldGroupComponent,
  textarea: FieldTextareaComponent,
  text: DivTextComponent,
  customInput: FieldCustomComponent,
  chipsInput: FieldChipsInputComponent,
  chipsAutocomplete: FieldChipsAutocompleteComponent
};

@Directive({
  selector: '[acDynamicField]'
})
export class DynamicFieldDirective implements AcField, OnChanges, OnInit {
  @Input()
  field: AcFieldConfig | AcTextConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<AcField>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
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
    const component = this.resolver.resolveComponentFactory<AcField>(components[this.field.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}
