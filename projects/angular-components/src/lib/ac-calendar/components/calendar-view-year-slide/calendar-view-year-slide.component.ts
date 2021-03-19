import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Moment} from 'moment';
import {ChangeViewEvent} from '../../models/change-view-event';
import {View} from '../../models/view.enum';
import {Subject} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {takeUntil} from 'rxjs/operators';
import {AcCalendarEvent} from '../../models/ac-calendar-event';

@Component({
  selector: 'ac-calendar-view-year-slide',
  templateUrl: './calendar-view-year-slide.component.html',
  styleUrls: ['./calendar-view-year-slide.component.scss']
})
export class CalendarViewYearSlideComponent implements OnInit, OnChanges, OnDestroy {
  @Input() year: Moment;
  @Input() active: boolean;
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  months: Moment[];
  unsubcribe$: Subject<void> = new Subject<void>();

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    if (this.active) {
      this.storeService.getEventlist().pipe(takeUntil(this.unsubcribe$)).subscribe((eventList: AcCalendarEvent[]) => {

      });
    }
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.year) {
      this.months = [];
      const d = this.year.clone();
      for (let i = 0; i < 12; i++) {
        this.months.push(d.clone());
        d.add(1, 'month');
      }
    }
  }

  goToMonth(date: Moment): void {
    this.changeView.emit({
      view: View.MONTH,
      date
    });
  }
}
