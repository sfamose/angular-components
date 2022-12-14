import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldChipsComponent } from './filter-field-chips.component';

describe('FilterFieldChipsComponent', () => {
  let component: FilterFieldChipsComponent;
  let fixture: ComponentFixture<FilterFieldChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
