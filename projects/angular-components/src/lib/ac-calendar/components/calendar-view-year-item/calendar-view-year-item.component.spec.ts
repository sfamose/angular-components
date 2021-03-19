import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewYearItemComponent } from './calendar-view-year-item.component';

describe('CalendarViewYearItemComponent', () => {
  let component: CalendarViewYearItemComponent;
  let fixture: ComponentFixture<CalendarViewYearItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewYearItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewYearItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
