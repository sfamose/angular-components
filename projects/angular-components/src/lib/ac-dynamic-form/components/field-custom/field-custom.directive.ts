import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive, EventEmitter,
  Host,
  Input,
  OnChanges, OnDestroy,
  OnInit, Optional, Output,
  Renderer2, SkipSelf, Type,
  ViewContainerRef
} from '@angular/core';
import {AsyncValidatorFn, ControlContainer, FormControl, FormGroup, NgControl, ValidatorFn} from '@angular/forms';
import {AcFieldCustomConfig} from '../../models/field-custom-config';
import {AcCustomComponentField} from '../../models/custom-component';

@Directive({
  selector: '[acFieldCustom]'
})
export class FieldCustomDirective extends NgControl implements OnChanges, OnInit, OnDestroy {
  @Input()
  field: AcFieldCustomConfig;

  @Input()
  group: FormGroup;

  name: string;
  component: ComponentRef<AcCustomComponentField>;

  // tslint:disable-next-line:no-output-rename
  @Output('ngModelChange') update = new EventEmitter();

  pcontrol: FormControl;

  constructor(@Optional() @Host() @SkipSelf() private parent: ControlContainer,
              private resolver: ComponentFactoryResolver, private container: ViewContainerRef, private renderer2: Renderer2) {
    super();
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!this.field.component) {
      throw new Error(
        `Trying to use an empty component`
      );
    }
    const component = this.resolver.resolveComponentFactory<AcCustomComponentField>(this.field.component);
    this.name = this.field.name;
    this.component = this.container.createComponent(component);
    this.valueAccessor = this.component.instance;
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
    this.pcontrol = this.formDirective.addControl(this);
  }

  get path(): string[] {
    return [...this.parent.path, this.name];
  }

  get formDirective(): any {
    return this.parent ? this.parent.formDirective : null;
  }

  get control(): FormControl {
    return this.pcontrol;
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
