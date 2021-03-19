import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'ac-calendar-view-year-item',
  templateUrl: './calendar-view-year-item.component.html',
  styleUrls: ['./calendar-view-year-item.component.scss']
})
export class CalendarViewYearItemComponent implements OnInit {
  @Input() date: Moment;

  constructor() { }

  ngOnInit(): void {
  }

}
