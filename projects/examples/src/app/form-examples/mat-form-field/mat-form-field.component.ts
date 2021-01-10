import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-mat-form-field',
  templateUrl: './mat-form-field.component.html',
  styleUrls: ['./mat-form-field.component.scss']
})
export class MatFormFieldComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'groupMatFormField',
        type: 'group',
        label: 'Mat-form-field',
        fields: [
          {
            name: 'inputText',
            type: 'input',
            inputType: 'text',
            label: 'Input'
          },
          {
            name: 'inputTextarea',
            type: 'textarea',
            label: 'Textarea'
          },
          {
            name: 'inputSelect',
            type: 'select',
            label: 'Select',
            options: ['option1', 'option2', 'option3']
          },
          {
            name: 'inputDate',
            type: 'date',
            label: 'Date'
          },
          {
            name: 'inputTime',
            type: 'time',
            label: 'Time'
          },
          {
            name: 'inputDateTime',
            type: 'datetime',
            label: 'DateTime'
          },
        ]
      },
      {
        name: 'groupAppearance',
        type: 'group',
        label: 'Appearance',
        fields: [
          {
            name: 'input1',
            type: 'input',
            label: 'standard',
            appearance: 'standard'
          },
          {
            name: 'input2',
            type: 'input',
            label: 'fill',
            appearance: 'fill'
          },
          {
            name: 'input3',
            type: 'input',
            label: 'legacy',
            appearance: 'legacy'
          },
          {
            name: 'input4',
            type: 'input',
            label: 'outline',
            appearance: 'outline'
          }
        ]
      },
      {
        name: 'groupOptions',
        type: 'group',
        label: 'Placeholder, disabled & readonly',
        fields: [
          {
            name: 'input1',
            type: 'input',
            label: 'Label and placeholder',
            placeholder: 'Placeholder',
          },
          {
            name: 'input2',
            type: 'input',
            label: 'Disabled input',
            disabled: true,
          },
          {
            name: 'input3',
            type: 'input',
            label: 'Readonly input',
            readonly: true
          },
          {
            name: 'input4',
            type: 'input',
            label: 'Initial value',
            value: 'Hello world!!!'
          }
        ]
      },
      {
        name: 'groupLabel',
        type: 'group',
        label: 'Label',
        fields: [
          {
            name: 'input1',
            type: 'input',
            label: 'Float label auto',
            floatLabel: 'auto'
          },
          {
            name: 'input2',
            type: 'input',
            label: 'Float label always',
            floatLabel: 'always'
          },
          {
            name: 'input3',
            type: 'input',
            label: 'Fancy label <i class="fa fa-star"></i>',
          }
        ]
      },
      {
        name: 'groupHint',
        type: 'group',
        label: 'Hints',
        fields: [
          {
            name: 'input1',
            type: 'input',
            startHint: {label: 'Input with start hint'}
          },
          {
            name: 'input2',
            type: 'input',
            endHint: {label: 'Input with end hint'}
          },
          {
            name: 'input2',
            type: 'input',
            endHint: {
              label: 'delete',
              action: (field, group) => {
                group.controls[field.name].setValue(null);
              }
            }
          }
        ]
      },
      {
        name: 'groupErros',
        type: 'group',
        label: 'Error Message',
        fields: [
          {
            name: 'input1',
            type: 'input',
            label: 'Name',
            required: true,
            validations: [
              {
                name: 'required',
                validator: Validators.required,
                message: 'The name is required'
              },
              {
                name: 'minlength',
                validator: Validators.minLength(4),
                message: 'The name must contain at least 4 characters'
              },
              {
                name: 'pattern',
                validator: Validators.pattern('^[a-zA-Z0-9]+$'),
                message: 'The name must contain only letters and numbers'
              }
            ]
          },
          {
            name: 'input2',
            type: 'input',
            inputType: 'email',
            label: 'Email',
            required: true,
            validations: [
              {
                name: 'required',
                validator: Validators.required,
                message: `The email address is required`
              },
              {
                name: 'pattern',
                validator: Validators.email,
                message: `The email address is invalid`
              }
            ]
          }
        ]
      },
      {
        name: 'groupPrefixSuffix',
        type: 'group',
        label: 'Prefix & Suffix',
        fields: [
          {
            name: 'input1',
            type: 'input',
            label: 'Name',
            prefixes: [{label: '<i class="fas fa-user"></i>'}]
          },
          {
            name: 'input2',
            type: 'input',
            label: 'Input with delete button',
            suffixes: [{
              label: '<i class="far fa-trash-alt"></i>',
              action: (field, group) => {
                group.controls[field.name].setValue(null);
              }
            }]
          },
          {
            name: 'input3',
            type: 'input',
            inputType: 'number',
            startHint: {label: 'Change the value with buttons'},
            value: 0,
            readonly: true,
            className: 'input-number-with-buttons',
            prefixes: [{
              label: '<i class="far fa-minus-square"></i>',
              action: (field, group) => {
                group.controls[field.name].setValue(Number(group.controls[field.name].value) - 1);
              }
            }],
            suffixes: [{
              label: '<i class="far fa-plus-square"></i>',
              action: (field, group) => {
                group.controls[field.name].setValue(Number(group.controls[field.name].value) + 1);
              }
            }, {
              label: '<i class="far fa-trash-alt"></i>',
              action: (field, group) => {
                group.controls[field.name].setValue(0);
              }
            }]
          }
        ]
      },
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
