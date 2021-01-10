import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {of} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'autocomplete',
        type: 'autocomplete',
        label: 'autocomplete',
        options: ['One', 'Two', 'Three'],
        matchOption: true
      },
      {
        name: 'async',
        type: 'autocomplete',
        label: 'with async options',
        asyncOptions: of(['One', 'Two', 'Three'])
      },
      {
        name: 'object',
        type: 'autocomplete',
        label: 'Object list',
        options: [
          {key: 'o1', value: 'options1'},
          {key: 'o2', value: 'options2'},
          {key: 'o3', value: 'options3'}
        ],
        labelKey: 'value',
        matchOption: true
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
