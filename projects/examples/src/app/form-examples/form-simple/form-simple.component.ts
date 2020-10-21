import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {AcDynamicForm} from 'angular-components';

@Component({
  selector: 'app-form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.css']
})
export class FormSimpleComponent implements OnInit {

  config: AcDynamicForm = {
    submitButton: {
      label: 'Save'
    },
    fields: [
      {
        type: 'input',
        label: 'Name',
        name: 'name',
        inputType: 'text',
        maxlength: 50,
        placeholder: 'test',
        className: 'test-input',
        startHint: {label: 'Start'},
        endHint: {label: 'End'},
        floatLabel: 'always'
      },
      {
        type: 'input',
        label: 'Email',
        name: 'email',
        inputType: 'email'
      },
      {
        type: 'input',
        label: 'Password',
        name: 'password',
        inputType: 'password',
        maxlength: 100,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'The password is required'
          }
        ]
      },
      {
        type: 'text',
        label: 'You can also just add text',
        className: 'header'
      },
      {
        type: 'checkbox',
        label: 'I accept <a href="#"> terms of use</a>',
        name: 'cgu'
      },
      {
        type: 'select',
        label: 'Age',
        name: 'age',
        options: ['<18', '18-30', '31-60', '>60']
      },
      {
        type: 'radiobutton',
        label: 'Gender',
        name: 'gender',
        options: ['Man', 'Woman']
      },
      {
        type: 'group',
        label: 'Date of birth',
        name: 'datetimeGroup',
        fields: [
          {
            type: 'date',
            label: 'Date',
            name: 'birthdate',
          },
          {
            type: 'time',
            label: 'Time',
            name: 'time'
          }
        ]
      },
      {
        type: 'textarea',
        label: 'Comment',
        name: 'comment'
      },
      {
        type: 'datetime',
        label: 'Datetime',
        name: 'datetime'
      },
      {
        type: 'autocomplete',
        label: 'Autocomplete',
        name: 'autocomplete',
        options: ['One', 'Two', 'Three']
      },
      {
        type: 'chipsInput',
        label: 'Chips',
        name: 'chipsInput',
        value: ['Lemon', 'Lime', 'Apple'],
        deleteLabel: '<i class="fas fa-times"></i>'
      },
      {
        type: 'chipsAutocomplete',
        label: 'Chips Autocomplete',
        name: 'chipsAutocomplete',
        options: ['Lemon', 'Lime', 'Apple'],
        deleteLabel: '<i class="fas fa-times"></i>'
      }

    ]
  };

  constructor() {

  }

  ngOnInit() {
  }

  submit($event: any) {
    console.log($event);
  }
}


