import {View} from './view.enum';
import {Moment} from 'moment';

export interface ChangeViewEvent {
  view: View;
  date: Moment;
}
