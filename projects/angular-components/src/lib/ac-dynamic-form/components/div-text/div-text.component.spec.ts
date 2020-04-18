import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DivTextComponent} from './div-text.component';

describe('DivTextComponent', () => {
  let component: DivTextComponent;
  let fixture: ComponentFixture<DivTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DivTextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivTextComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'text', label: 'Test', className: 'classTest'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field');
  });

  it('should have the class "ac-dynamic-field-text"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('ac-dynamic-field-text');
  });

  it('should have the classes defined by the className attribute', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('classTest');
  });

  it('do not have a button if no action defined', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('button')).toBeFalsy();
  });

  it('should have a label if no action defined', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toEqual('Test');
  });


  it('should have a button if an action is defined', () => {
    fixture.componentInstance.field.action = () => {};
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('button');
    expect(myField).toBeTruthy();
  });

  it('the button should have a label if an action is defined', () => {
    fixture.componentInstance.field.action = () => {};
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('button');
    expect(myField.textContent).toContain('Test');
  });

  it('buttonAction call the method action', async(() => {
    fixture.componentInstance.field.action = () => {};
    spyOn(fixture.componentInstance.field, 'action');
    const mouseenter = new MouseEvent('mouseenter');
    fixture.componentInstance.buttonAction(mouseenter);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.field.action).toHaveBeenCalled();
      });
  }));

});
