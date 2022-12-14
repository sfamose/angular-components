import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {Moment} from 'moment';
import {AcCalendarEvent} from '../../models/ac-calendar-event';
import {EventService} from '../../services/event.service';


@Component({
  selector: 'ac-calendar-view-month-item',
  templateUrl: './calendar-view-month-item.component.html',
  styleUrls: ['./calendar-view-month-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewMonthItemComponent implements OnChanges {
  @Input() date: Moment;
  @Input() active: boolean;
  @Input() eventList: AcCalendarEvent[];
  list: AcCalendarEvent[];
  eventMap: { [key: number]: { event: AcCalendarEvent; show: boolean; startCss: boolean; endCss: boolean; } } = {};
  tooManyElement = false;
  @ViewChild('content', {static: true})
  content: ElementRef;

  constructor(private eventService: EventService) {
  }

  ngOnChanges(): void {
    if (this.eventList) {
      this.calculEvents(this.eventList);
    }
  }

  calculEvents(eventList: AcCalendarEvent[]) {
    const list = eventList ? eventList.filter(x => this.date.isSameOrAfter(x.dateDebut, 'day')
      && this.date.isSameOrBefore(x.dateFin, 'day')) : [];
    list.sort(this.eventService.sortByPosition);

    this.tooManyElement = list.filter(x => x.position > 3).length > 0;
    this.eventMap = {};
    if (list && list.length > 0) {
      for (const event of list) {
        this.eventMap[event.position] = this.convertEvent(event);
      }
    }
  }

  private convertEvent(event: AcCalendarEvent) {
    return {
      event,
      show: event.dateDebut.isSame(this.date, 'day'),
      startCss: event.dateDebut.isSame(this.date, 'day'),
      endCss: event.dateFin.isSame(this.date, 'day')
    };
  }

  /*
    private isDifferentList(list: AcCalendarEvent[]) {
      if (this.eventList.length !== list.length) {
        return true;
      } else {
        for (let i = 0; i < list.length; i++) {
          if (list[i].label !== this.eventList[i].label || list[i].position !== this.eventList[i].position) {
            return true;
          }
        }
      }
      return false;
    }

   */

}
