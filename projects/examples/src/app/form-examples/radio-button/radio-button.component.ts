import { Component, OnInit } from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {of} from 'rxjs';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'radiobutton',
        label: 'Simple radio button',
        options: ['option1', 'option2', 'option3']
      },
      {
        name: 'async',
        type: 'radiobutton',
        label: 'Radio button with async options',
        asyncOptions: of(['option1', 'option2', 'option3'])
      },
      {
        name: 'objectList',
        type: 'radiobutton',
        label: 'Radio button with list of objects',
        value: 2,
        options: [
          {id: 1, name: 'item1'},
          {id: 2, name: 'item2'},
          {id: 3, name: 'item3'},
        ],
        labelKey: 'name',
        valueKey: 'id'
      },
      {
        name: 'disabled',
        type: 'radiobutton',
        label: 'Disabled radio button',
        options: ['option1', 'option2', 'option3'],
        disabled: true
      },
      {
        name: 'required',
        type: 'radiobutton',
        label: 'Required radio button',
        options: ['option1', 'option2', 'option3'],
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'A value is required'
          }
        ]
      },
      {
        name: 'optionDisabled',
        type: 'radiobutton',
        label: 'Disable one option',
        options: [
          {id: 1, name: 'item1'},
          {id: 2, name: 'item2', disabled: true},
          {id: 3, name: 'item3'},
        ],
        labelKey: 'name',
        disabledKey: 'disabled'
      },
      {
        name: 'color',
        type: 'radiobutton',
        label: 'Color',
        options: ['option1', 'option2', 'option3'],
        value: 'option1',
        color: 'primary'
      },
      {
        name: 'optionDisabled',
        type: 'radiobutton',
        label: 'One Color per option',
        options: [
          {id: 1, name: 'item1', color: 'primary'},
          {id: 2, name: 'item2', color: 'accent'},
          {id: 3, name: 'item3', color: 'warn'},
        ],
        labelKey: 'name',
        colorKey: 'color'
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
