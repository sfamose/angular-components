import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  config: AcDynamicForm = {
    fields: [
      {
        name: 'simple',
        type: 'textarea',
        label: 'Simple textarea',
        placeholder: 'Placeholder'
      },
      {
        name: 'simple',
        type: 'textarea',
        label: 'Autosize textarea',
        autosize: true,
        minRows: 5,
        maxRows: 10
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }
}
