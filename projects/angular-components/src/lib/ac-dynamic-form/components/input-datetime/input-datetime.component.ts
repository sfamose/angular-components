import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Moment} from 'moment';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
import {AcFieldDatetimeConfig} from '../../models/field-datetime-config';
import {MatFormFieldControl} from '@angular/material/form-field';


class MyDatetime {
  constructor(public date: Moment, public time: string) {
  }
}

@Component({
  selector: 'ac-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: InputDatetimeComponent}]
})
export class InputDatetimeComponent implements ControlValueAccessor, MatFormFieldControl<MyDatetime>, OnInit, OnDestroy {
  static nextId = 0;
  @Input()
  field: AcFieldDatetimeConfig;
  @Input()
  group: FormGroup;

  @ViewChild('timePicker', {static: true}) timePicker: NgxMaterialTimepickerComponent;
  form: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'input';
  @HostBinding() id = `input-datetime-${InputDatetimeComponent.nextId++}`;
  describedBy = '';
  private pPlaceholder: string;
  private pRequired = false;
  private pDisabled = false;

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  filterDate = (d: Moment | null): boolean => {
    return this.field.filter ? this.field.filter(d, this.field, this.group) : true;
  };

  get empty() {
    const {value: {date, time}} = this.form;
    return !date && !time;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this.pPlaceholder;
  }

  set placeholder(value: string) {
    this.pPlaceholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this.pRequired;
  }

  set required(value: boolean) {
    this.pRequired = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.pDisabled;
  }

  set disabled(value: boolean) {
    this.pDisabled = coerceBooleanProperty(value);
    this.pDisabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): MyDatetime | null {
    const {value: {date, time}} = this.form;
    if (date != null && time != null) {
      return new MyDatetime(date, time);
    }
    return null;
  }

  set value(datetime: MyDatetime | null) {
    const {date, time} = datetime || new MyDatetime(null, '');
    this.form.setValue({date, time});
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private pFocusMonitor: FocusMonitor,
    private pElementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.form = formBuilder.group({
      date: '',
      time: '',
    });

    pFocusMonitor.monitor(pElementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.pFocusMonitor.stopMonitoring(this.pElementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.pElementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(datetime: MyDatetime | null): void {
    this.value = datetime;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDatePickerClose() {
    // this.timePicker.open();
    this.onChange(this.form.value);
  }

  onTimePickerClose() {
    this.onChange(this.form.value);
  }
}
