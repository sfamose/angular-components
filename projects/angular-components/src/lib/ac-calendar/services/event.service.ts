import { Injectable } from '@angular/core';
import {AcCalendarEvent} from '../models/ac-calendar-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  sortEventList(eventList: AcCalendarEvent[]): AcCalendarEvent[] {
    const list = [].concat(eventList).sort(this.sortByDateAndLength);
    if (list.length > 0) {
      const date = list[0].dateDebut.clone();
      const max = list[list.length - 1].dateDebut.clone();
      while (date.isSameOrBefore(max, 'day')) {
        const dateList = list.filter(x => x.dateDebut.isSameOrBefore(date, 'day') && x.dateFin.isSameOrAfter(date, 'day'));
        for (const event of dateList) {
          if (!event.position && event.position !== 0) {
            const alreadyUsePosition = dateList.map(x => x.position).sort();
            event.position = this.calculPosition(alreadyUsePosition);
          }
          // console.log(date.format('DD-MM-YYYY'), event.label, event.position);
        }
        date.add(1, 'day');
      }
    }
    return list;
  }

  sortByPosition(a: AcCalendarEvent, b: AcCalendarEvent) {
    if (a.position <= b.position) {
      return -1;
    } else {
      return 1;
    }
  }

  sortByDurationDesc(a: AcCalendarEvent, b: AcCalendarEvent) {
    const diffA = a.dateFin.diff(a.dateDebut, 'ms');
    const diffB = b.dateFin.diff(b.dateDebut, 'ms');
    if (diffA <= diffB) {
      return 1;
    } else {
      return 1;
    }
  }

  sortByDateAndLength(a: AcCalendarEvent, b: AcCalendarEvent) {
    if (a.dateDebut.isBefore(b.dateDebut, 'day')) {
      return -1;
    } else if (a.dateDebut.isAfter(b.dateDebut, 'day')) {
      return 1;
    } else if (a.dateFin.isAfter(b.dateFin, 'day')) {
      return -1;
    } else if (a.dateFin.isBefore(b.dateFin, 'day')) {
      return 1;
    }
  }

  calculPosition(alreadyUsePosition: number[]): number {
    let i = 0;
    while (alreadyUsePosition.indexOf(i) !== -1) {
      i++;
    }
    return i;
  }
}
