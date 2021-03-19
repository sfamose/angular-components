import {Moment} from 'moment';

export interface Day {
  label: string;
  date: Moment;
  today: boolean;
  weekend: boolean;
  currentMonth?: boolean;
}
