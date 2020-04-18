import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldCustomComponent} from './field-custom.component';

describe('FieldCustomComponent', () => {
  let component: FieldCustomComponent;
  let fixture: ComponentFixture<FieldCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldCustomComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCustomComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'customInput', name: 'test', component: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field');
  });

  it('should have the class "ac-dynamic-field-custom"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field-custom');
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
});
