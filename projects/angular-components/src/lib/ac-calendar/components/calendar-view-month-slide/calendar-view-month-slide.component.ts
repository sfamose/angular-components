import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {DateService} from '../../services/date.service';
import {ChangeViewEvent} from '../../models/change-view-event';
import {View} from '../../models/view.enum';
import {Day} from '../../models/day';
import {StoreService} from '../../services/store.service';
import {EventService} from '../../services/event.service';
import {AcCalendarEvent} from '../../models/ac-calendar-event';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-calendar-view-month-slide',
  templateUrl: './calendar-view-month-slide.component.html',
  styleUrls: ['./calendar-view-month-slide.component.scss']
})
export class CalendarViewMonthSlideComponent implements OnChanges, OnDestroy {
  @Input() month: Moment;
  @Input() active: boolean;
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  days: string[];
  weeks: Day[][];
  eventList: AcCalendarEvent[];
  unsubcribe$: Subject<void> = new Subject<void>();

  constructor(private dateService: DateService,
              private storeService: StoreService,
              private eventService: EventService) {
  }

  ngOnChanges(): void {
    this.weeks = this.dateService.calculWeeks(this.month);
    this.days = this.weeks[0] ? this.weeks[0].map(x => x.label) : [];

    if (this.active) {
      const startDate = this.weeks[0][0].date;
      const endDate = this.weeks[this.weeks.length - 1][6].date;
      this.storeService.getEventlist().pipe(takeUntil(this.unsubcribe$)).subscribe(events => {
        const eventList = events.filter(x => x.dateDebut.isSameOrBefore(endDate, 'day')
          && x.dateFin.isSameOrAfter(startDate, 'day'));
        this.eventList = this.eventService.sortEventList(eventList);
      });
    }
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  goToDate(date: Moment) {
    this.changeView.emit({
      view: View.DAY,
      date
    });
  }
}
