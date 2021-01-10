import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {AcFieldRadioButtonConfig} from '../../models/field-radio-button-config';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-field-radio-button',
  templateUrl: './field-radio-button.component.html',
  styleUrls: ['./field-radio-button.component.scss']
})
export class FieldRadioButtonComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldRadioButtonConfig;
  group: FormGroup;
  private unsubcribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group));
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
