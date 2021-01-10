import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {AcTextConfig} from '../models/text-config';
import {DynamicFormService} from '../services/dynamic-form.service';
import {AcGroupConfig} from '../models/group-config';
import {AcFieldConfig} from '../models/field-config';
import {AcDynamicForm} from '../models/dynamic-form';
import {Observable, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  exportAs: 'dynamicForm',
  selector: 'ac-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [DynamicFormService]
})
export class AcDynamicFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  config: AcDynamicForm = {
    submitButton: null,
    fields: [],
    debounceTime: 0
  };

  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();
  unsubcribe$: Subject<void> = new Subject<void>();

  get form(): FormGroup {
    return this.dynamicFormService.getForm();
  }

  get controls(): { [key: string]: AbstractControl; } {
    return this.form ? this.form.controls : null;
  }

  get changes(): Observable<any> {
    return this.form ? this.form.valueChanges : null;
  }

  get valid(): boolean {
    return this.form ? this.form.valid : null;
  }

  get value(): any {
    return this.form ? this.form.value : null;
  }

  fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];

  constructor(private dynamicFormService: DynamicFormService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.dynamicFormService.createForm(this.config.fields, this.config.updateOn);
    this.fields = [].concat(this.config.fields);

    if (!this.config.submitButton) {
      this.form.valueChanges.pipe(
        debounceTime(this.config.debounceTime ? this.config.debounceTime : 0),
        takeUntil(this.unsubcribe$)
      ).subscribe(values => {
        this.formSubmit.emit(values);
      });
    }
  }

  ngOnChanges() {
    if (this.form) {
      this.dynamicFormService.updateForm(this.config.fields);
      this.fields = [].concat(this.config.fields);
    }
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }
}
