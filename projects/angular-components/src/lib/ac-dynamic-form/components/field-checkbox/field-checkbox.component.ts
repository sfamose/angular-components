import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AcField} from '../../models/field';
import {AcFieldCheckboxConfig} from '../../models/field-checkbox-config';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DynamicFormService} from '../../services/dynamic-form.service';

@Component({
  selector: 'ac-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['./field-checkbox.component.scss']
})
export class FieldCheckboxComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldCheckboxConfig;
  group: FormGroup;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor(private dynamicFormService: DynamicFormService) {
  }

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.group.get(this.field.name).valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.field, this.group, this.dynamicFormService.getFields()));
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
