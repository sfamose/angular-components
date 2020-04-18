import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldGroupComponent} from './field-group.component';
import {MaterialModule} from '../../../material.module';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DynamicFieldDirective} from '../dynamic-field.directive';

describe('FieldGroupComponent', () => {
  let component: FieldGroupComponent;
  let fixture: ComponentFixture<FieldGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [FieldGroupComponent, DynamicFieldDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'group', name: 'test'};
    fixture.componentInstance.group = new FormGroup({test: new FormGroup({subtest: new FormControl('')})});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field-group"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field-group');
  });

  it('should have classes defined by field.className', () => {
    fixture.componentInstance.field.className = 'classTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div.ac-dynamic-field-group').classList).toContain('classTest');

    fixture.componentInstance.field.className = ['classTest1', 'classTest2'];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div.ac-dynamic-field-group').classList).not.toContain('classTest');
    expect(fixture.debugElement.nativeElement.querySelector('div.ac-dynamic-field-group').classList).toContain('classTest1');
    expect(fixture.debugElement.nativeElement.querySelector('div.ac-dynamic-field-group').classList).toContain('classTest2');
  });

  it('onValueChanges is called if the value changes', async(() => {
    fixture.componentInstance.field.onValueChanges = () => {
    };
    spyOn(fixture.componentInstance.field, 'onValueChanges');
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.group.get(fixture.componentInstance.field.name).setValue({subtest: 'test'});
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.field.onValueChanges).toHaveBeenCalled();
      });
  }));
});
