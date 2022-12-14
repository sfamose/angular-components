import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldSelectComponent } from './filter-field-select.component';

describe('FilterFieldSelectComponent', () => {
  let component: FilterFieldSelectComponent;
  let fixture: ComponentFixture<FilterFieldSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
