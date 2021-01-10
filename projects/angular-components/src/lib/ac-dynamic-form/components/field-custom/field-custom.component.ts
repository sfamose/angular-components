import {Component, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {AcFieldCustomConfig} from '../../models/field-custom-config';

@Component({
  selector: 'ac-field-custom',
  templateUrl: './field-custom.component.html',
  styleUrls: ['./field-custom.component.scss']
})
export class FieldCustomComponent implements OnInit, AcField {
  field: AcFieldCustomConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
