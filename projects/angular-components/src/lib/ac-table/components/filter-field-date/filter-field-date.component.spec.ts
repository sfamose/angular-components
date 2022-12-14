import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldDateComponent } from './filter-field-date.component';

describe('FilterFieldDateComponent', () => {
  let component: FilterFieldDateComponent;
  let fixture: ComponentFixture<FilterFieldDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
