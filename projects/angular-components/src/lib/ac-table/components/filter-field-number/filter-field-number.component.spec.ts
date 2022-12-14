import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldNumberComponent } from './filter-field-number.component';

describe('FilterFieldNumberComponent', () => {
  let component: FilterFieldNumberComponent;
  let fixture: ComponentFixture<FilterFieldNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
