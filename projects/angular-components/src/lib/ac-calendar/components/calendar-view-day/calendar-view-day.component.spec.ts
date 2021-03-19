import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewDayComponent } from './calendar-view-day.component';

describe('CalendarViewDayComponent', () => {
  let component: CalendarViewDayComponent;
  let fixture: ComponentFixture<CalendarViewDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
