import {Component, Inject, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {Moment} from 'moment';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss']
})
export class DatetimeComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'datetime',
        label: 'Simple Datetime'
      },
      {
        name: 'dateMinmax',
        type: 'datetime',
        label: 'Date with min & max',
        minDate: this.moment().add('MONTH', -1),
        maxDate: this.moment().add('MONTH', 1),
        startHint: {label: 'min date = ' + this.moment().add('MONTH', -1).format('DD MMM YYYY')},
        endHint: {label: 'max date = ' + this.moment().add('MONTH', 1).format('DD MMM YYYY')}
      },
      {
        name: 'timeMinmax',
        type: 'datetime',
        label: 'Time with min & max',
        format: 24,
        minTime: '09:00',
        maxTime: '18:00',
        startHint: {label: 'min: 09:00'},
        endHint: {label: 'max: 18:00'}
      },
      {
        name: 'filter',
        type: 'datetime',
        label: 'Date with filter validation',
        filter: (d: Moment | null) => {
          return d.day() !== 0 && d.day() !== 6;
        }
      },
      {
        name: 'touchUI',
        type: 'datetime',
        label: 'touch UI',
        touchUi: true
      },
      {
        name: 'disabled',
        type: 'datetime',
        label: 'Disabled Date',
        disabled: true
      },
      {
        name: 'format24',
        type: 'datetime',
        label: 'Format 24h',
        format: 24
      },
      {
        name: 'defaultTime',
        type: 'datetime',
        label: 'defaultTime 11:11 pm',
        defaultTime: '11:11 pm'
      },
      {
        name: 'minutesGap',
        type: 'datetime',
        label: 'minutesGap',
        minutesGap: 10
      },
      {
        name: 'theme',
        type: 'datetime',
        label: 'time with teme'
      }
    ]
  };

  constructor(@Inject('moment') private moment) {
  }

  ngOnInit() {
  }

}
