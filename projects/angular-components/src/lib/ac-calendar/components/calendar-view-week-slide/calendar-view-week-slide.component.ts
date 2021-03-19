import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {ChangeViewEvent} from '../../models/change-view-event';
import {View} from '../../models/view.enum';
import {AcCalendarOptions} from '../../models/ac-calendar-options';
import {LABELS} from '../../config/default-config';
import {AcCalendarLabels} from '../../models/ac-calendar-labels';
import {Day} from '../../models/day';

@Component({
  selector: 'ac-calendar-view-week-slide',
  templateUrl: './calendar-view-week-slide.component.html',
  styleUrls: ['./calendar-view-week-slide.component.scss']
})
export class CalendarViewWeekSlideComponent implements OnInit, OnChanges {
  @Input() week: Moment;
  @Input() active: boolean;
  @Input() options: AcCalendarOptions;
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  hours: string[];
  days: Day[];
  allDay: string;

  constructor(@Inject('moment') private moment,
              @Inject(LABELS) private defaultLabels: AcCalendarLabels) {
  }

  ngOnInit() {
    this.hours = Array(24)
      .fill(null)
      .map((x, i) => (i < 10 ? '0' + i : i) + ':00');
  }

  ngOnChanges(): void {
    this.allDay = (this.options && this.options.labels && this.options.labels.allDay) || this.defaultLabels.allDay;
    this.days = [];
    const d = this.week.clone();
    for (let i = 0; i < 7; i++) {
      this.days.push({
        label: d.format('dd'),
        date: d.clone(),
        today: this.moment().isSame(d, 'day'),
        weekend: d.day() === 0 || d.day() === 6
      });
      d.add(1, 'day');
    }
  }

  goToDate(date: Moment) {
    this.changeView.emit({
      view: View.DAY,
      date
    });
  }

}
