import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {DateService} from '../../services/date.service';
import {ChangeViewEvent} from '../../models/change-view-event';
import {View} from '../../models/view.enum';
import {Day} from '../../models/day';

@Component({
  selector: 'ac-calendar-view-month-slide',
  templateUrl: './calendar-view-month-slide.component.html',
  styleUrls: ['./calendar-view-month-slide.component.scss']
})
export class CalendarViewMonthSlideComponent implements OnChanges {
  @Input() month: Moment;
  @Input() active: boolean;
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  days: string[];
  weeks: Day[][];

  constructor(private dateService: DateService) {
  }

  ngOnChanges(): void {
    this.weeks = this.dateService.calculWeeks(this.month);
    this.days = this.weeks[0] ? this.weeks[0].map(x => x.label) : [];
  }

  goToDate(date: Moment) {
    this.changeView.emit({
      view: View.DAY,
      date
    });
  }
}
