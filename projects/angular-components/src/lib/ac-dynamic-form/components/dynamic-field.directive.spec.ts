import {DynamicFieldDirective} from './dynamic-field.directive';
import {DivTextComponent} from './div-text/div-text.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AcFieldConfig} from '../models/field-config';
import {AcTextConfig} from '../models/text-config';
import {AcGroupConfig} from '../models/group-config';
import {By} from '@angular/platform-browser';
import {FieldCheckboxComponent} from './field-checkbox/field-checkbox.component';
import {FieldTextareaComponent} from './field-textarea/field-textarea.component';
import {FieldGroupComponent} from './field-group/field-group.component';
import {FieldSelectComponent} from './field-select/field-select.component';
import {FieldInputComponent} from './field-input/field-input.component';
import {FieldDateComponent} from './field-date/field-date.component';
import {FieldRadioButtonComponent} from './field-radio-button/field-radio-button.component';
import {MaterialModule} from '../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  DEFAULT_DATE_FORMAT, DEFAULT_INPUT_MAXLENGTH,
  DEFAULT_LOCALE,
  DEFAULT_MAT_FORM_FIELD_APPEARANCE,
  DEFAULT_MAT_FORM_FIELD_FLOATLABEL, INPUT_MAXLENGTH,
  MAT_FORM_FIELD_APPEARANCE,
  MAT_FORM_FIELD_FLOATLABEL
} from '../config/default-config';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


// creating a test component in the spec file
@Component(
  {
    selector: 'ac-test',
    template: `
      <div>
        <ng-container acDynamicField [field]="field" [group]="form"></ng-container>
      </div>
    `
  }
)
class TestComponent {
  field: AcFieldConfig | AcTextConfig | AcGroupConfig;
  form: FormGroup;
}

describe('DynamicFieldDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [TestComponent, DynamicFieldDirective,
        DivTextComponent,
        FieldCheckboxComponent,
        FieldInputComponent,
        FieldSelectComponent,
        FieldRadioButtonComponent,
        FieldDateComponent,
        FieldGroupComponent,
        FieldTextareaComponent,
        DivTextComponent],
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: DEFAULT_LOCALE}, {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE]
        }, {provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMAT},
        {
          provide: MAT_FORM_FIELD_APPEARANCE,
          useValue: DEFAULT_MAT_FORM_FIELD_APPEARANCE
        },
        {
          provide: MAT_FORM_FIELD_FLOATLABEL,
          useValue: DEFAULT_MAT_FORM_FIELD_FLOATLABEL
        },
        {
          provide: INPUT_MAXLENGTH,
          useValue: DEFAULT_INPUT_MAXLENGTH
        }
      ]


    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FieldCheckboxComponent,
          FieldInputComponent,
          FieldSelectComponent,
          FieldRadioButtonComponent,
          FieldDateComponent,
          FieldGroupComponent,
          FieldTextareaComponent,
          DivTextComponent]
      }
    }).compileComponents();
  }));
  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create the directive', () => {
    const componentFactoryResolver = fixture.debugElement.injector.get(ComponentFactoryResolver);
    const viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
    const directive = new DynamicFieldDirective(componentFactoryResolver, viewContainerRef);
    expect(directive).toBeTruthy();
  });

  it('should add the DivTextComponent', () => {
    fixture.componentInstance.field = {type: 'text', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-div-text'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldCheckboxComponent', () => {
    fixture.componentInstance.field = {type: 'checkbox', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-checkbox'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldDateComponent', () => {
    fixture.componentInstance.field = {type: 'date', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-date'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldGroupComponent', () => {
    fixture.componentInstance.field = {type: 'group', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-group'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldInputComponent', () => {
    fixture.componentInstance.field = {type: 'input', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-input'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldRadioButtonComponent', () => {
    fixture.componentInstance.field = {type: 'radiobutton', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-radio-button'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldSelectComponent', () => {
    fixture.componentInstance.field = {type: 'select', name: 'test', label: 'test', options: []};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-select'));
    expect(c).toBeTruthy();
  });

  it('should add the FieldTextareaComponent', () => {
    fixture.componentInstance.field = {type: 'textarea', name: 'test', label: 'test'};
    fixture.componentInstance.form = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
    const c = fixture.debugElement.query(By.css('ac-field-textarea'));
    expect(c).toBeTruthy();
  });

});
