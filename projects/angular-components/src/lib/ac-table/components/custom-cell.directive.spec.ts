import {CustomCellDirective} from './custom-cell.directive';
import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AcTableColumn} from '../models/ac-table-column';

// creating a test component in the spec file
@Component(
  {
    selector: 'ac-test',
    template: `
      <div>
        <ng-container acCustomCell [column]="column" [element]="element"></ng-container>
      </div>
    `
  }
)
class TestComponent {
  column: AcTableColumn;
  element: any;
}

describe('CustomCellDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [TestComponent, CustomCellDirective],
      providers: []


    }).compileComponents();
  }));
  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create the directive', () => {
    const componentFactoryResolver = fixture.debugElement.injector.get(ComponentFactoryResolver);
    const viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
    const directive = new CustomCellDirective(componentFactoryResolver, viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
