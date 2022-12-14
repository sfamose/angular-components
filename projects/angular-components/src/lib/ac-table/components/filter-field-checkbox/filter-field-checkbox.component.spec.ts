import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldCheckboxComponent } from './filter-field-checkbox.component';

describe('FilterFieldCheckboxComponent', () => {
  let component: FilterFieldCheckboxComponent;
  let fixture: ComponentFixture<FilterFieldCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
