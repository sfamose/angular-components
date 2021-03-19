import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekComponent } from './calendar-view-week.component';

describe('CalendarViewWeekComponent', () => {
  let component: CalendarViewWeekComponent;
  let fixture: ComponentFixture<CalendarViewWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
