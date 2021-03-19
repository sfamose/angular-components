import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewWeekSlideComponent } from './calendar-view-week-slide.component';

describe('CalendarViewWeekSlideComponent', () => {
  let component: CalendarViewWeekSlideComponent;
  let fixture: ComponentFixture<CalendarViewWeekSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewWeekSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewWeekSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
