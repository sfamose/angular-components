import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarExamplesRoutingModule } from './calendar-examples-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import {AcCalendarModule} from 'angular-components';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarExamplesRoutingModule,
    AcCalendarModule
  ]
})
export class CalendarExamplesModule { }
