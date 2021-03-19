import {Component, Inject, OnInit} from '@angular/core';
import {AcCalendarEvent} from '../../../../../angular-components/src/lib/ac-calendar/models/ac-calendar-event';
import {Moment} from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  eventList: AcCalendarEvent[];

  constructor(@Inject('moment') private moment) {
  }

  ngOnInit(): void {
    this.eventList = [
      {
        label: 'test',
        dateDebut: this.moment(),
        dateFin: this.moment(),
        allDay: true
      },
      {
        label: 'test',
        dateDebut: this.moment(),
        dateFin: this.moment().add('hour', 1),
        allDay: false
      }
    ];
  }

}
