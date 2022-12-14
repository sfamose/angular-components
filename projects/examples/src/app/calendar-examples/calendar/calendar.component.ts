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
        label: 'test1',
        dateDebut: this.moment().add('day', -5),
        dateFin: this.moment(),
        allDay: true
      },
      {
        label: 'test2',
        dateDebut: this.moment(),
        dateFin: this.moment().add('day', 3),
        allDay: true
      },
      {
        label: 'test3',
        dateDebut: this.moment(),
        dateFin: this.moment().add('hour', 1),
        allDay: false
      },
      {
        label: 'test4',
        dateDebut: this.moment(),
        dateFin: this.moment().add('hour', 1),
        allDay: false
      },
      {
        label: 'test5',
        dateDebut: this.moment().add('day', 1),
        dateFin: this.moment().add('day', 1),
        allDay: true
      },
      {
        label: 'test6',
        dateDebut: this.moment().add('day', 1),
        dateFin: this.moment().add('day', 1),
        allDay: true
      },
      {
        label: 'test7',
        dateDebut: this.moment(),
        dateFin: this.moment().add('hour', 1),
        allDay: false
      },
      {
        label: 'test8',
        dateDebut: this.moment(),
        dateFin: this.moment().add('hour', 1),
        allDay: false
      }
    ];
  }

}
