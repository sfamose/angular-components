import {Component, forwardRef, OnInit} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AcFieldCustomConfig, AcCustomComponentField} from 'angular-components';

@Component({
  selector: 'app-input-rating',
  templateUrl: './input-rating.component.html',
  styleUrls: ['./input-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRatingComponent),
      multi: true
    }
  ]
})
export class InputRatingComponent extends AcCustomComponentField implements OnInit {

  field: AcFieldCustomConfig;
  group?: FormGroup;

  public stars: boolean[] = [];
  public disabled: boolean;
  private value: number;

  onChange = (rating: number) => {
  }
  onTouched = () => {
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.stars = [];
    const max = this.field ? this.field.data.max : 5;
    for (let i = 0; i < max; i++) {
      this.stars.push(i < this.value);
    }
  }

  public rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  writeValue(rating: number): void {
    this.value = rating;
    this.stars = this.stars.map((x, i) => i < rating);
    this.onChange(this.value);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
