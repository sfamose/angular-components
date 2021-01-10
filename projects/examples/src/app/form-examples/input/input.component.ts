import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'inputText',
        type: 'input',
        inputType: 'text',
        label: 'Input type text'
      },
      {
        name: 'inputEmail',
        type: 'input',
        inputType: 'email',
        label: 'Input type email'
      },
      {
        name: 'inputPassword',
        type: 'input',
        inputType: 'password',
        label: 'Input type password'
      },
      {
        name: 'inputNumber',
        type: 'input',
        inputType: 'number',
        label: 'Input type number'
      },
      {
        name: 'inputColor',
        type: 'input',
        inputType: 'color',
        label: 'Input type color'
      },
      {
        name: 'inputdate',
        type: 'input',
        inputType: 'date',
        label: 'Input type date'
      },
      {
        name: 'inputdatetime-local',
        type: 'input',
        inputType: 'datetime-local',
        label: 'Input type datetime-local'
      },
      {
        name: 'inputmonth',
        type: 'input',
        inputType: 'month',
        label: 'Input type month'
      },
      {
        name: 'inputsearch',
        type: 'input',
        inputType: 'search',
        label: 'Input type search'
      },
      {
        name: 'inputtel',
        type: 'input',
        inputType: 'tel',
        label: 'Input type tel'
      },
      {
        name: 'inputtime',
        type: 'input',
        inputType: 'time',
        label: 'Input type time'
      },
      {
        name: 'inputurl',
        type: 'input',
        inputType: 'url',
        label: 'Input type url'
      },
      {
        name: 'inputweek',
        type: 'input',
        inputType: 'week',
        label: 'Input type week'
      },
      {
        name: 'inputmaxlength',
        type: 'input',
        inputType: 'text',
        label: 'Maxlength : 10',
        maxlength: 10
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
