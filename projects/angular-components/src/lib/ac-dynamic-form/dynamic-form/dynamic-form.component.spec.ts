import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AcDynamicFormComponent} from './dynamic-form.component';
import {DynamicFormService} from '../services/dynamic-form.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

describe('AcDynamicFormComponent', () => {
  let component: AcDynamicFormComponent;
  let fixture: ComponentFixture<AcDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AcDynamicFormComponent],
      providers: [DynamicFormService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('have a form', () => {
    expect(component.form).toBeTruthy();
    expect(component.controls).toBeTruthy();
    expect(component.changes).toBeTruthy();
    expect(component.valid).toBeTruthy();
    expect(component.value).toBeTruthy();
  });

  it('handleSubmit', async(() => {
    const mouseenter = new MouseEvent('mouseenter');
    spyOn(mouseenter, 'stopPropagation').and.callThrough();
    component.handleSubmit(mouseenter);
    expect(mouseenter.stopPropagation).toHaveBeenCalled();
  }));

  it('handleSubmit emis event if the form is valid', async(() => {
    const mouseenter = new MouseEvent('mouseenter');
    spyOn(component.formSubmit, 'emit').and.callThrough();
    component.config = {
      fields: [{type: 'input', name: 'test'}]
    };
    component.ngOnChanges();
    component.handleSubmit(mouseenter);
    expect(component.valid).toBeTrue();
    expect(component.formSubmit.emit).toHaveBeenCalled();
  }));

  it('handleSubmit calls validateAllFormFields if the form is not valid', async(() => {
    const mouseenter = new MouseEvent('mouseenter');
    spyOn(component, 'validateAllFormFields').and.callThrough();
    component.config = {
      fields: [{type: 'input', name: 'test', validations: [
          {name: 'required', validator: Validators.required, message: ''}]
      }]
    };
    component.ngOnChanges();
    component.handleSubmit(mouseenter);
    expect(component.valid).toBeFalse();
    expect(component.validateAllFormFields).toHaveBeenCalled();
  }));
});
