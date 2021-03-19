import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewListComponent } from './calendar-view-list.component';

describe('CalendarViewListComponent', () => {
  let component: CalendarViewListComponent;
  let fixture: ComponentFixture<CalendarViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
