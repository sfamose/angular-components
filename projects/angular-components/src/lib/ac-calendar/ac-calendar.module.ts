import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcCalendarComponent} from './calendar/calendar.component';
import {CalendarHeaderComponent} from './components/calendar-header/calendar-header.component';
import {CalendarViewDayComponent} from './components/calendar-view-day/calendar-view-day.component';
import {CalendarViewListComponent} from './components/calendar-view-list/calendar-view-list.component';
import {CalendarViewWeekComponent} from './components/calendar-view-week/calendar-view-week.component';
import {CalendarViewMonthComponent} from './components/calendar-view-month/calendar-view-month.component';
import {CalendarViewYearComponent} from './components/calendar-view-year/calendar-view-year.component';
import {MaterialModule} from '../material.module';
import {IonicModule} from '@ionic/angular';
import {CalendarViewMonthSlideComponent} from './components/calendar-view-month-slide/calendar-view-month-slide.component';
import {CalendarViewMonthItemComponent} from './components/calendar-view-month-item/calendar-view-month-item.component';
import {CalendarViewWeekSlideComponent} from './components/calendar-view-week-slide/calendar-view-week-slide.component';
import {CalendarViewDaySlideComponent} from './components/calendar-view-day-slide/calendar-view-day-slide.component';
import {CalendarViewYearSlideComponent} from './components/calendar-view-year-slide/calendar-view-year-slide.component';
import {DEFAULT_LABELS, LABELS} from './config/default-config';
import { CalendarViewYearItemComponent } from './components/calendar-view-year-item/calendar-view-year-item.component';


@NgModule({
  declarations: [AcCalendarComponent, CalendarHeaderComponent, CalendarViewDayComponent,
    CalendarViewListComponent, CalendarViewWeekComponent, CalendarViewMonthComponent,
    CalendarViewYearComponent, CalendarViewMonthSlideComponent, CalendarViewMonthItemComponent,
    CalendarViewWeekSlideComponent, CalendarViewDaySlideComponent, CalendarViewYearSlideComponent, CalendarViewYearItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule
  ],
  exports: [AcCalendarComponent],
  providers: [
    {
      provide: LABELS,
      useValue: DEFAULT_LABELS
    }
  ]
})
export class AcCalendarModule {
}
