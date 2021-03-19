import {Inject, Injectable} from '@angular/core';
import {Moment} from 'moment';
import {Day} from '../models/day';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(@Inject('moment') private moment) {
  }


  calculWeeks(month: Moment): Day[][] {
    const weeks: Day[][] = [];
    if (month) {
      let day = month.clone().startOf('week');
      let i = 0;
      while (day.month() !== month.month() + 1 && i < 6) {
        const days = [];
        for (let d = 0; d < 7; d++) {
          days.push({
            label: day.format('dd'),
            date: day.clone(),
            currentMonth: day.month() === month.month(),
            today: this.moment().isSame(day, 'day'),
            weekend: day.day() === 0 || day.day() === 6
          });
          day = day.clone().add(1, 'day');
        }
        i++;
        weeks.push(days);
      }
    }
    return weeks;
  }
}
