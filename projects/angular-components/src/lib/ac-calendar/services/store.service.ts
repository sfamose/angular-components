import {Injectable} from '@angular/core';
import {AcCalendarEvent} from '../models/ac-calendar-event';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  eventList: BehaviorSubject<AcCalendarEvent[]> = new BehaviorSubject<AcCalendarEvent[]>([]);

  constructor() {
  }

  getEventlist(): Observable<AcCalendarEvent[]> {
    return this.eventList.asObservable();
  }

  setEventList(eventList: AcCalendarEvent[]) {
    this.eventList.next(eventList);
  }
}
