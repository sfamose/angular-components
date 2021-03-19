import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewMonthSlideComponent } from './calendar-view-month-slide.component';

describe('CalendarViewMonthSlideComponent', () => {
  let component: CalendarViewMonthSlideComponent;
  let fixture: ComponentFixture<CalendarViewMonthSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewMonthSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewMonthSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
