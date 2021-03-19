import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewDaySlideComponent } from './calendar-view-day-slide.component';

describe('CalendarViewDaySlideComponent', () => {
  let component: CalendarViewDaySlideComponent;
  let fixture: ComponentFixture<CalendarViewDaySlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewDaySlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewDaySlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
