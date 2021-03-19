import {AcCalendarLabels} from '../models/ac-calendar-labels';
import {InjectionToken} from '@angular/core';

export const LABELS = new InjectionToken<string>('LABELS');

export const DEFAULT_LABELS: AcCalendarLabels = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
  year: 'Year',
  allDay: 'All day'
}
