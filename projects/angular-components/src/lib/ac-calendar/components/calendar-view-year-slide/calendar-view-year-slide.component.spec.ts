import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewYearSlideComponent } from './calendar-view-year-slide.component';

describe('CalendarViewYearSlideComponent', () => {
  let component: CalendarViewYearSlideComponent;
  let fixture: ComponentFixture<CalendarViewYearSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewYearSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewYearSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
