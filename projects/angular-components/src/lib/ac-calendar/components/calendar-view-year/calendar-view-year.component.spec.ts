import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewYearComponent } from './calendar-view-year.component';

describe('CalendarViewYearComponent', () => {
  let component: CalendarViewYearComponent;
  let fixture: ComponentFixture<CalendarViewYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
