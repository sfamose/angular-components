import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Moment} from 'moment';
import {IonSlides} from '@ionic/angular';
import {ChangeViewEvent} from '../../models/change-view-event';
import {AcCalendarOptions} from '../../models/ac-calendar-options';

@Component({
  selector: 'ac-calendar-view-week',
  templateUrl: './calendar-view-week.component.html',
  styleUrls: ['./calendar-view-week.component.scss']
})
export class CalendarViewWeekComponent implements OnInit {
  @Input() week: Moment;
  @Input() options: AcCalendarOptions;
  @Output() weekChange: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  previousWeek: Moment;
  nextWeek: Moment;
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
    this.week = this.week.startOf('week');
    this.previousWeek = this.week.clone().add(-1, 'week');
    this.nextWeek = this.week.clone().add(1, 'week');
  }

  onSlideDidChange(): void {
    if (this.init) {
      this.init = false;
      return;
    }
    this.slider.getActiveIndex().then(activeIndex => {
      const direction = activeIndex === 2 ? 1 : -1;
      this.week = this.week.clone().add(direction, 'week');
      this.previousWeek = this.previousWeek.clone().add(direction, 'week');
      this.nextWeek = this.nextWeek.clone().add(direction, 'week');
      this.slider.slideTo(1, 0, false);
      this.weekChange.emit(this.week);
    });
  }

  onChangeView(event: ChangeViewEvent) {
    this.changeView.emit(event);
  }

}
