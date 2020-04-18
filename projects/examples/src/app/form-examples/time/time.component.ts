import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'time',
        label: 'Simple Time'
      },
      {
        name: 'format24',
        type: 'time',
        label: 'Format 24h',
        format: 24
      },
      {
        name: 'defaultTime',
        type: 'time',
        label: 'defaultTime 11:11 pm',
        defaultTime: '11:11 pm'
      },
      {
        name: 'disabled',
        type: 'time',
        label: 'disabled',
        disabled: true
      },
      {
        name: 'minmax',
        type: 'time',
        label: 'Time with min & max',
        format: 24,
        minTime: '09:00',
        maxTime: '18:00',
        startHint: {label: 'min: 09:00'},
        endHint: {label: 'max: 18:00'}
      },
      {
        name: 'minutesGap',
        type: 'time',
        label: 'minutesGap',
        minutesGap: 10
      },
      {
        name: 'theme',
        type: 'time',
        label: 'time with teme',
        theme: {
          container: {
            bodyBackgroundColor: '#424242',
            buttonColor: '#fff'
          },
          dial: {
            dialBackgroundColor: '#555',
          },
          clockFace: {
            clockFaceBackgroundColor: '#555',
            clockHandColor: '#9fbd90',
            clockFaceTimeInactiveColor: '#fff'
          }
        }
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
