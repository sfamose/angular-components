import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldRadioButtonComponent} from './field-radio-button.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FieldRadioButtonComponent', () => {
  let component: FieldRadioButtonComponent;
  let fixture: ComponentFixture<FieldRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [FieldRadioButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'radiobutton', name: 'test'};
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

  it('should have the class "ac-dynamic-field-raddiobutton"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field-raddiobutton');
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

  it('onValueChanges is called if the value changes', async(() => {
    fixture.componentInstance.field.onValueChanges = () => {
    };
    spyOn(fixture.componentInstance.field, 'onValueChanges');
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.group.get(fixture.componentInstance.field.name).setValue(null);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.field.onValueChanges).toHaveBeenCalled();
      });
  }));
});
