import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef} from '@angular/core';
import {AcCell} from '../models/ac-cell';
import {AcTableColumn} from '../models/ac-table-column';

@Directive({
  selector: '[acCustomCell]'
})
export class CustomCellDirective implements OnChanges, OnInit {

  @Input()
  column: AcTableColumn;
  @Input()
  element: any;
  component: ComponentRef<AcCell>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.element = this.element;
    }
  }

  ngOnInit(): void {
    if (!this.column.component) {
      throw new Error(
        `Trying to use an empty component`
      );
    }
    const component = this.resolver.resolveComponentFactory<AcCell>(this.column.component);
    this.component = this.container.createComponent(component);
    this.component.instance.element = this.element;
  }

}
