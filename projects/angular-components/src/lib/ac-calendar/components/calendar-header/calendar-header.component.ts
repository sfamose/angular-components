import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output} from '@angular/core';
import {View} from '../../models/view.enum';
import {Moment} from 'moment';
import {AcCalendarOptions} from '../../models/ac-calendar-options';
import {AcCalendarLabels} from '../../models/ac-calendar-labels';
import {LABELS} from '../../config/default-config';

@Component({
  selector: 'ac-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnChanges {
  @Input() date: Moment;
  @Input() view = View;
  @Input() options: AcCalendarOptions;
  @Output() changeView: EventEmitter<View> = new EventEmitter<View>();
  Views = View;
  dayLabel: string;
  weekLabel: string;
  monthLabel: string;
  yearLabel: string;

  constructor(@Inject(LABELS) private defaultLabels: AcCalendarLabels) {
  }

  ngOnChanges() {
    this.dayLabel = (this.options && this.options.labels && this.options.labels.day) || this.defaultLabels.day;
    this.weekLabel = (this.options && this.options.labels && this.options.labels.week) || this.defaultLabels.week;
    this.monthLabel = (this.options && this.options.labels && this.options.labels.month) || this.defaultLabels.month;
    this.yearLabel = (this.options && this.options.labels && this.options.labels.year) || this.defaultLabels.year;
  }

  seeView(view: View) {
    this.changeView.emit(view);
  }

}
