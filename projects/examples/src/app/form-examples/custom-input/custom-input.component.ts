import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {InputRatingComponent} from './input-rating/input-rating.component';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {


  config: AcDynamicForm = {
    fields: [
      {
        name: 'level',
        type: 'customInput',
        component: InputRatingComponent,
        value: 3,
        data: {
          max: 5
        }
      }
    ]
  };


  constructor() {
  }

  ngOnInit() {
  }


}
