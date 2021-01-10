import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AcField} from '../../models/field';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL, SEPARATOR_KEY_CODE} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {MatChipInputEvent} from '@angular/material/chips';
import {FieldChipsAutocompleteConfig} from '../../models/field-chips-autocomplete-config';
import {Observable, Subject} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-field-chips-autocomplete',
  templateUrl: './field-chips-autocomplete.component.html',
  styleUrls: ['./field-chips-autocomplete.component.scss']
})
export class FieldChipsAutocompleteComponent implements OnInit, OnDestroy, AcField {
  field: FieldChipsAutocompleteConfig;
  group: FormGroup;
  ctrl = new FormControl();
  filteredOptions: Observable<string[]>;
  private unsubcribe$: Subject<void> = new Subject<void>();
  private options;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  get values() {
    return this.group.get(this.field.name).value;
  }

  constructor(
    @Inject(SEPARATOR_KEY_CODE) public separatorKeysCodes: number[],
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType
  ) {
  }

  ngOnInit(): void {
    this.field.separatorKeysCodes = this.field.separatorKeysCodes || this.separatorKeysCodes;
    if (this.field.options) {
      this.options = this.field.options;
      this.onValueChange();
    } else if (this.field.asyncOptions) {
      this.field.asyncOptions.pipe(takeUntil(this.unsubcribe$)).subscribe(x => {
        this.options = x;
        this.onValueChange();
      });
    }

    if (!this.values) {
      this.group.get(this.field.name).setValue([]);
    }
  }

  buttonAction(event: MouseEvent, b: AcAffix | AcHint) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();
    if (value && this.options.indexOf(value) !== -1) {
      this.values.push(value);
    }
    if (input) {
      input.value = '';
    }
    this.ctrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.values.indexOf(item);
    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.values.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.ctrl.setValue(null);
  }

  private onValueChange() {
    this.filteredOptions = this.ctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
      takeUntil(this.unsubcribe$)
    );
  }

  private _filter(value: string): string[] {
    return this.options
      .filter(option => this.values.indexOf(option) === -1)
      .filter(option => !value || option.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
