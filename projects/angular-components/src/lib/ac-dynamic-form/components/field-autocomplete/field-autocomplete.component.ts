import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AcField} from '../../models/field';
import {MAT_FORM_FIELD_APPEARANCE, MAT_FORM_FIELD_FLOATLABEL} from '../../config/default-config';
import {FloatLabelType, MatFormFieldAppearance} from '@angular/material/form-field';
import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AcAffix} from '../../models/affix';
import {AcHint} from '../../models/hint';
import {AcFieldAutocompleteConfig} from '../../models/field-autocomplete-config';
import {map, startWith, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ac-field-autocomplete',
  templateUrl: './field-autocomplete.component.html',
  styleUrls: ['./field-autocomplete.component.css']
})
export class FieldAutocompleteComponent implements OnInit, OnDestroy, AcField {
  field: AcFieldAutocompleteConfig;
  group: FormGroup;
  public filteredOptions: Observable<any[]>;
  private unsubcribe$: Subject<void> = new Subject<void>();
  private options;

  constructor(
    @Inject(MAT_FORM_FIELD_APPEARANCE) public appearance: MatFormFieldAppearance,
    @Inject(MAT_FORM_FIELD_FLOATLABEL) public floatLabel: FloatLabelType
  ) {
  }

  ngOnInit(): void {
    if (this.field.options) {
      this.options = this.field.options;
      this.onValueChange();
    } else if (this.field.asyncOptions) {
      this.field.asyncOptions.pipe(takeUntil(this.unsubcribe$)).subscribe(x => {
        this.options = x;
        this.onValueChange();
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  buttonAction(event: MouseEvent, b: AcAffix | AcHint) {
    event.stopPropagation();
    b.action(this.field, this.group);
  }

  displayWith(option?: any): any {
    return this.field.labelKey && option && typeof option === 'object' ? option[this.field.labelKey] : option;
  }

  onBlur(): void {
    if (this.field.matchOption) {
      setTimeout(() => {
        const value = this.group.get(this.field.name).value;
        const opt = this.options.filter(x => (!this.field.labelKey && value === x)
          || (this.field.labelKey && (value === x[this.field.labelKey]
            || (value && value[this.field.labelKey] === x[this.field.labelKey]))));

        if (opt.length === 1) {
          this.group.get(this.field.name).setValue(opt[0]);
        } else {
          this.group.get(this.field.name).setValue(null);
        }
      }, 500);
    }
  }

  private onValueChange() {
    this.filteredOptions = this.group.get(this.field.name).valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
      takeUntil(this.unsubcribe$)
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this.field.labelKey && value && typeof value === 'object' ? value[this.field.labelKey] : value;
    return this.options.filter(option => {
      let v = option;
      if (this.field.labelKey) {
        v = option[this.field.labelKey];
      }
      return !filterValue || v.toLowerCase().indexOf(filterValue.toLowerCase()) === 0;
    });
  }
}
