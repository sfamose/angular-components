import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'ac-calendar-view-month-item',
  templateUrl: './calendar-view-month-item.component.html',
  styleUrls: ['./calendar-view-month-item.component.scss']
})
export class CalendarViewMonthItemComponent implements OnInit {
  @Input() date: Moment;
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
