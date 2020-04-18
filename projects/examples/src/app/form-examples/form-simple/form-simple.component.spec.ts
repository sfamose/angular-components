import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSimpleComponent } from './form-simple.component';

describe('FormSimpleComponent', () => {
  let component: FormSimpleComponent;
  let fixture: ComponentFixture<FormSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
