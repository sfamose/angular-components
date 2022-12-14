import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldTextComponent } from './filter-field-text.component';

describe('FilterFieldTextComponent', () => {
  let component: FilterFieldTextComponent;
  let fixture: ComponentFixture<FilterFieldTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
