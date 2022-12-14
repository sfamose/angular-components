import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {FormGroup} from '@angular/forms';
import {AcGroupConfig} from '../../models/group-config';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicFormService} from '../../services/dynamic-form.service';

@Component({
  selector: 'ac-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.scss']
})
export class FieldGroupComponent implements OnInit, OnDestroy, AcField {
  field: AcGroupConfig;
  group: FormGroup;
  private unsubcribe$: Subject<void> = new Subject<void>();

  get subGroup() {
    return this.group.controls[this.field.name] as FormGroup;
  }

  constructor(private dynamicFormService: DynamicFormService) {
  }

  ngOnInit(): void {
    if (this.field.onValueChanges) {
      this.subGroup.valueChanges.pipe(takeUntil(this.unsubcribe$))
        .subscribe(value => this.field.onValueChanges(value, this.subGroup, this.dynamicFormService.getFields()));
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
