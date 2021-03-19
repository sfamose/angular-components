import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewMonthItemComponent } from './calendar-view-month-item.component';

describe('CalendarViewMonthItemComponent', () => {
  let component: CalendarViewMonthItemComponent;
  let fixture: ComponentFixture<CalendarViewMonthItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewMonthItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewMonthItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
