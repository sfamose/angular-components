import {Component, Inject, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {Moment} from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

    config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'date',
        label: 'Simple Date'
      },
      {
        name: 'minmax',
        type: 'date',
        label: 'Date with min & max',
        minDate: this.moment().add('MONTH', -1),
        maxDate: this.moment().add('MONTH', 1),
        startHint: {label: 'min date = ' + this.moment().add('MONTH', -1).format('DD MMM YYYY')},
        endHint: {label: 'max date = ' + this.moment().add('MONTH', 1).format('DD MMM YYYY')}
      },
      {
        name: 'filter',
        type: 'date',
        label: 'Date with filter validation',
        filter: (d: Moment | null) => {
          return d.day() !== 0 && d.day() !== 6;
        }
      },
      {
        name: 'popup',
        type: 'date',
        label: 'Date with only popup ',
        onlyPopup: true
      },
      {
        name: 'disabled',
        type: 'date',
        label: 'Disabled Date',
        disabled: true
      },
      {
        name: 'touchUI',
        type: 'date',
        label: 'touch UI',
        touchUi: true
      }
    ]
  };

  constructor(@Inject('moment') private moment) {
  }

  ngOnInit() {
  }

}
