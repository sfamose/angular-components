import {Moment} from 'moment';

export interface AcCalendarEvent {
  label: string;
  dateDebut: Moment;
  dateFin: Moment;
  allDay: boolean;
  position?: number;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}
