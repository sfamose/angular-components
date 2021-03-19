import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {View} from '../models/view.enum';
import {Moment} from 'moment';
import {ChangeViewEvent} from '../models/change-view-event';
import {AcCalendarOptions} from '../models/ac-calendar-options';
import {AcCalendarEvent} from '../models/ac-calendar-event';
import {StoreService} from '../services/store.service';

@Component({
  selector: 'ac-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class AcCalendarComponent implements OnInit, OnChanges {
  @Input() view: View = View.MONTH;
  @Input() date: Moment;
  @Input() options: AcCalendarOptions;
  @Input() eventList: AcCalendarEvent[];
  Views = View;

  constructor(@Inject('moment') private moment,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    if (!this.date) {
      this.date = this.moment();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.eventList) {
      this.storeService.setEventList(this.eventList);
    }
  }

  onChangeView($event: View): void {
    this.view = $event;
  }

  onChangeViewAndDate(event: ChangeViewEvent): void {
    this.view = event.view;
    this.date = event.date;
  }
}
