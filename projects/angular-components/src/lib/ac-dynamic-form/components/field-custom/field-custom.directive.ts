import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive, EventEmitter,
  Host,
  Input,
  OnChanges, OnDestroy,
  OnInit, Optional, Output,
  Renderer2, SkipSelf,
  ViewContainerRef
} from '@angular/core';
import {AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NgControl, ValidatorFn} from '@angular/forms';
import {AcField} from '../../models/field';
import {AcFieldCustomConfig} from '../../models/field-custom-config';

@Directive({
  selector: '[acFieldCustom]'
})
export class FieldCustomDirective extends NgControl implements OnChanges, OnInit, OnDestroy {
  @Input()
  field: AcFieldCustomConfig;

  @Input()
  group: FormGroup;

  name: string;
  component: ComponentRef<ControlValueAccessor>;

  @Output('ngModelChange') update = new EventEmitter();

  _control: FormControl;

  constructor(@Optional() @Host() @SkipSelf() private parent: ControlContainer,
              private resolver: ComponentFactoryResolver, private container: ViewContainerRef, private renderer2: Renderer2) {
    super();
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance['field'] = this.field;
      this.component.instance['group'] = this.group;
    }
  }

  ngOnInit() {
    if (!this.field.component) {
      throw new Error(
        `Trying to use an empty component`
      );
    }
    const component = this.resolver.resolveComponentFactory<ControlValueAccessor>(this.field.component);
    this.name = this.field.name;
    this.component = this.container.createComponent(component);
    this.valueAccessor = this.component.instance;
    this.component.instance['field'] = this.field;
    this.component.instance['group'] = this.group;
    this._control = this.formDirective.addControl(this);
  }

  get path(): string[] {
    return [...this.parent.path !, this.name];
  }

  get formDirective(): any {
    return this.parent ? this.parent.formDirective : null;
  }

  get control(): FormControl {
    return this._control;
  }

  get validator(): ValidatorFn | null {
    return null;
  }

  get asyncValidator(): AsyncValidatorFn {
    return null;
  }

  viewToModelUpdate(newValue: any): void {
    this.update.emit(newValue);
  }

  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
    if (this.component) {
      this.component.destroy();
    }
  }

}
