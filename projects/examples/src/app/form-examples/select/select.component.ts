import {Component, OnInit} from '@angular/core';
import {AcDynamicForm, AcFieldSelectConfig} from 'angular-components';
import {of} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'select',
        label: 'Simple select',
        placeholder: 'Placeholder',
        required: true,
        options: ['option1', 'option2', 'option3']
      },
      {
        name: 'multiple',
        type: 'select',
        label: 'Multiple select',
        multiple: true,
        options: ['option1', 'option2', 'option3'],
        startHint: {
          label: 'Deselect all', action: (field, group) => {
            group.controls[field.name].setValue(null);
          }
        },
        endHint: {
          label: 'Select all', action: (field: AcFieldSelectConfig, group: FormGroup) => {
            group.controls[field.name].setValue(field.options);
          }
        }
      },
      {
        name: 'reset',
        type: 'select',
        label: 'Select with reset option',
        resetOption: true,
        options: ['option1', 'option2', 'option3']
      },
      {
        name: 'resetWithLabel',
        type: 'select',
        label: 'Select with reset option (with label)',
        resetOption: true,
        resetOptionLabel: 'None',
        options: ['option1', 'option2', 'option3']
      },
      {
        name: 'async',
        type: 'select',
        label: 'Select with async options',
        multiple: true,
        asyncOptions: of(['option1', 'option2', 'option3']),
        startHint: {
          label: 'Deselect all', action: (field, group) => {
            group.controls[field.name].setValue(null);
          }
        },
        endHint: {
          label: 'Select all', action: (field: AcFieldSelectConfig, group: FormGroup) => {
            group.controls[field.name].setValue(field.options);
          }
        }
      },
      {
        name: 'optionGroups',
        type: 'select',
        label: 'Select with optionGroups',
        optionGroups: [
          {label: 'group1', options: ['option1', 'option2', 'option3']},
          {label: 'group2', options: ['option4', 'option5', 'option6']}
        ],
        groupLabelKey: 'label',
        optionsKey: 'options'
      },
      {
        name: 'asyncOptionGroups',
        type: 'select',
        label: 'Select with async optionGroups',
        asyncOptionGroups: of([
          {name: 'group1', items: ['option1', 'option2', 'option3']},
          {name: 'group2', items: ['option4', 'option5', 'option6']}
        ]),
        groupLabelKey: 'name',
        optionsKey: 'items'
      },
      {
        name: 'objectList',
        type: 'select',
        label: 'Select with list of objects',
        options: [
          {id: 1, name: 'item1'},
          {id: 2, name: 'item2'},
          {id: 3, name: 'item3'},
        ],
        labelKey: 'name',
        valueKey: 'id'
      },
      {
        name: 'panelClass',
        type: 'select',
        label: 'Select with custom panel styling',
        options: ['option1', 'option2', 'option3'],
        panelClassName: 'panel-red'
      },
      {
        name: 'compareWith',
        type: 'select',
        label: 'Select with compareWith',
        value: {id: 2, name: 'item2'},
        options: [
          {id: 1, name: 'item1'},
          {id: 2, name: 'item2'},
          {id: 3, name: 'item3'},
        ],
        labelKey: 'name',
        compareWith: (c1, c2) => {
          return c1 && c2 && c1.id === c2.id;
        }
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
