import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Moment} from 'moment';
import {IonSlides} from '@ionic/angular';
import {ChangeViewEvent} from '../../models/change-view-event';

@Component({
  selector: 'ac-calendar-view-year',
  templateUrl: './calendar-view-year.component.html',
  styleUrls: ['./calendar-view-year.component.scss']
})
export class CalendarViewYearComponent implements OnInit {
  @Input() year: Moment;
  @Output() yearChange: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() changeView: EventEmitter<ChangeViewEvent> = new EventEmitter<ChangeViewEvent>();
  previousYear: Moment;
  nextYear: Moment;
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
    this.year = this.year.startOf('year');
    this.previousYear = this.year.clone().add(-1, 'year');
    this.nextYear = this.year.clone().add(1, 'year');
  }

  onSlideDidChange(): void {
    if (this.init) {
      this.init = false;
      return;
    }
    this.slider.getActiveIndex().then(activeIndex => {
      const direction = activeIndex === 2 ? 1 : -1;
      this.year = this.year.clone().add(direction, 'year');
      this.previousYear = this.previousYear.clone().add(direction, 'year');
      this.nextYear = this.nextYear.clone().add(direction, 'year');
      this.slider.slideTo(1, 0, false);
      this.yearChange.emit(this.year);
    });
  }

  onChangeView(event: ChangeViewEvent) {
    this.changeView.emit(event);
  }

}
