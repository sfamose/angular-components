import {Component, Inject, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {AcCalendarEvent} from '../../models/ac-calendar-event';
import {LABELS} from '../../config/default-config';
import {AcCalendarLabels} from '../../models/ac-calendar-labels';
import {AcCalendarOptions} from '../../models/ac-calendar-options';
import {StoreService} from '../../services/store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'ac-calendar-view-day-slide',
  templateUrl: './calendar-view-day-slide.component.html',
  styleUrls: ['./calendar-view-day-slide.component.scss']
})
export class CalendarViewDaySlideComponent implements OnInit, OnChanges, OnDestroy {
  @Input() day: Moment;
  @Input() active: boolean;
  @Input() options: AcCalendarOptions;
  hours: string[];
  allDayEvents: AcCalendarEvent[];
  hourEvents: AcCalendarEvent[];
  eventList: AcCalendarEvent[] = [];
  isAllDaysShown = false;
  allDay: string;
  unsubcribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(LABELS) private defaultLabels: AcCalendarLabels,
              private storeService: StoreService,
              @Inject('moment') private moment) {
  }

  ngOnInit(): void {
    this.hours = Array(24)
      .fill(null)
      .map((x, i) => (i < 10 ? '0' + i : i) + ':00');
    this.storeService.getEventlist().pipe(takeUntil(this.unsubcribe$)).subscribe((eventList: AcCalendarEvent[]) => {
      this.eventList = eventList;
      this.setEvents();
    });
  }

  ngOnChanges() {
    this.allDay = (this.options && this.options.labels && this.options.labels.allDay) || this.defaultLabels.allDay;
    this.setEvents();
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  setEvents() {
    this.allDayEvents = this.eventList ? this.eventList.filter(x => this.day.isSameOrAfter(x.dateDebut, 'day')
      && this.day.isSameOrBefore(x.dateFin, 'day') && x.allDay) : [];

    this.eventList
      .filter(x => this.day.isSameOrAfter(x.dateDebut, 'day')
        && this.day.isSameOrBefore(x.dateFin, 'day')
        && !x.allDay)
      .forEach(x => {
        const startHour = parseInt(x.dateDebut.format('HH'), 10) * 60 + parseInt(x.dateDebut.format('mm'), 10);
        const endHour = parseInt(x.dateFin.format('HH'), 10) * 60 + parseInt(x.dateFin.format('mm'), 10);
        console.log(x.label, startHour, endHour);
      });
  }

  showAllDays() {
    this.isAllDaysShown = true;
  }

  hideAllDays() {
    this.isAllDaysShown = false;
  }

}
