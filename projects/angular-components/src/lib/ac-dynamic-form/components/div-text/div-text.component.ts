import {Component} from '@angular/core';
import {AcField} from '../../models/field';
import {AcTextConfig} from '../../models/text-config';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ac-div-text',
  templateUrl: './div-text.component.html',
  styleUrls: ['./div-text.component.scss']
})
export class DivTextComponent implements AcField {
  field: AcTextConfig;
  group: FormGroup;

  constructor() {
  }

  buttonAction(event: MouseEvent) {
    event.stopPropagation();
    this.field.action(this.group);
  }
}
