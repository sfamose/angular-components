import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AcButton} from './ac-button';

@Component({
  selector: 'ac-ac-button',
  templateUrl: './ac-button.component.html',
  styleUrls: ['./ac-button.component.css']
})
export class AcButtonComponent {
  @Input() config: AcButton;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  clickButton() {
    this.buttonClick.emit();
  }
}
