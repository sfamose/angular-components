import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldCheckboxComponent} from './field-checkbox.component';
import {MaterialModule} from '../../../material.module';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FieldCheckboxComponent', () => {
  let component: FieldCheckboxComponent;
  let fixture: ComponentFixture<FieldCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [FieldCheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'checkbox', name: 'test'};
    fixture.componentInstance.group = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field');
  });

  it('should have the class "ac-dynamic-field-checkbox"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field-checkbox');
  });

  it('should have classes defined by field.className', () => {
    fixture.componentInstance.field.className = 'classTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div').classList).toContain('classTest');

    fixture.componentInstance.field.className = ['classTest1', 'classTest2'];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div').classList).not.toContain('classTest');
    expect(fixture.debugElement.nativeElement.querySelector('div').classList).toContain('classTest1');
    expect(fixture.debugElement.nativeElement.querySelector('div').classList).toContain('classTest2');
  });

  it('should have the label defined by field.label', () => {
    fixture.componentInstance.field.label = 'labelTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('label')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('label').textContent).toContain('labelTest');
  });

  it('onValueChanges is called if the value changes', async(() => {
    fixture.componentInstance.field.onValueChanges = () => {
    };
    spyOn(fixture.componentInstance.field, 'onValueChanges');
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.group.get(fixture.componentInstance.field.name).setValue(true);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.field.onValueChanges).toHaveBeenCalled();
      });
  }));
});
