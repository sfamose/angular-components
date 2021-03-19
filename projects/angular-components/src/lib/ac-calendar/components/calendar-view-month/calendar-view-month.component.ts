import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Moment} from 'moment';
import {ChangeViewEvent} from '../../models/change-view-event';

@Component({
  selector: 'ac-calendar-view-month',
  templateUrl: './calendar-view-month.component.html',
  styleUrls: ['./calendar-view-month.component.scss']
})
export class CalendarViewMonthComponent implements OnInit {
  @Input() month: Moment;
  @Output() monthChange: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  previousMonth: Moment;
  nextMonth: Moment;
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
    this.month = this.month.startOf('month');
    this.previousMonth = this.month.clone().add(-1, 'month');
    this.nextMonth = this.month.clone().add(1, 'month');
  }

  onSlideDidChange(): void {
    if (this.init) {
      this.init = false;
      return;
    }
    this.slider.getActiveIndex().then(activeIndex => {
      const direction = activeIndex === 2 ? 1 : -1;
      this.month = this.month.clone().add(direction, 'month');
      this.previousMonth = this.previousMonth.clone().add(direction, 'month');
      this.nextMonth = this.nextMonth.clone().add(direction, 'month');
      this.slider.slideTo(1, 0, false);
      this.monthChange.emit(this.month);
    });
  }

  onChangeView(event: ChangeViewEvent) {
    this.changeView.emit(event);
  }
}
