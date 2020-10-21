import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldChipsInputComponent } from './field-chips-input.component';

describe('FieldChipsInputComponent', () => {
  let component: FieldChipsInputComponent;
  let fixture: ComponentFixture<FieldChipsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldChipsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldChipsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
