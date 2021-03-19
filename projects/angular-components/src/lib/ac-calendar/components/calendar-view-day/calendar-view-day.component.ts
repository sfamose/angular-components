import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Moment} from 'moment';
import {IonSlides} from '@ionic/angular';
import {AcCalendarOptions} from '../../models/ac-calendar-options';
import {Subject} from 'rxjs';

@Component({
  selector: 'ac-calendar-view-day',
  templateUrl: './calendar-view-day.component.html',
  styleUrls: ['./calendar-view-day.component.scss']
})
export class CalendarViewDayComponent implements OnInit {
  @Input() day: Moment;
  @Input() options: AcCalendarOptions;
  @Output() dayChange: EventEmitter<Moment> = new EventEmitter<Moment>();
  previousDay: Moment;
  nextDay: Moment;
  slideOpts = {
    slidesPerView: 1,
    initialSlide: 1,
    speed: 400,
    spaceBetween: 0
  };
  init = true;
  @ViewChild('slider', {static: true}) slider: IonSlides;

  constructor() {
  }

  ngOnInit(): void {
    this.day = this.day.startOf('day');
    this.previousDay = this.day.clone().add(-1, 'day');
    this.nextDay = this.day.clone().add(1, 'day');
  }

  onSlideDidChange(): void {
    if (this.init) {
      this.init = false;
      return;
    }
    this.slider.getActiveIndex().then(activeIndex => {
      const direction = activeIndex === 2 ? 1 : -1;
      this.day = this.day.clone().add(direction, 'day');
      this.previousDay = this.previousDay.clone().add(direction, 'day');
      this.nextDay = this.nextDay.clone().add(direction, 'day');
      this.slider.slideTo(1, 0, false);
      this.dayChange.emit(this.day);
    });
  }
}
