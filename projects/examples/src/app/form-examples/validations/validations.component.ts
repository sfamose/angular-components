import {Component, OnInit} from '@angular/core';
import {AcDynamicForm} from 'angular-components';
import {AbstractControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {


  config: AcDynamicForm = {
    fields: [
      {
        name: 'required',
        type: 'input',
        inputType: 'text',
        label: 'Required',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'A value is required'
          }
        ]
      },
      {
        name: 'minlength',
        type: 'input',
        inputType: 'text',
        label: 'Minlength',
        validations: [
          {
            name: 'minlength',
            validator: Validators.minLength(3),
            message: 'The name must contain at least 3 characters'
          }
        ]
      },
      {
        name: 'maxlength',
        type: 'input',
        inputType: 'text',
        label: 'Maxlength',
        validations: [
          {
            name: 'maxlength',
            validator: Validators.maxLength(10),
            message: 'The name must contain a maximum of 10 characters'
          }
        ]
      },
      {
        name: 'onlyletters',
        type: 'input',
        inputType: 'text',
        label: 'Only letters',
        validations: [
          {
            name: 'maxlength',
            validator: Validators.pattern('^[a-zA-Z]+$'),
            message: 'The name should only contain letters'
          }
        ]
      },
      {
        name: 'custom',
        type: 'input',
        inputType: 'text',
        label: 'Custom validator',
        validations: [
          {
            name: 'confirm',
            validator: (control) => this.sameValueValidator(control, 'onlyletters'),
            message: 'The value must be equal to the field Only letters'
          }
        ]
      },
      {
        name: 'async',
        type: 'input',
        inputType: 'text',
        label: 'Asynchrone validator',
        validations: [
          {
            name: 'asyncValidation',
            asyncValidator: this.asyncValueValidator,
            message: 'The value must be equal to TEST'
          }
        ]
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

  sameValueValidator(c: AbstractControl, fieldKey: string): { [key: string]: any } {
    const parent = c.parent as FormGroup;
    if (parent && c.value !== parent.controls[fieldKey].value) {
      return {confirm: true};
    } else {
      return null;
    }
  }

  asyncValueValidator(c: AbstractControl): Observable<{ [key: string]: any }> {
    return of(c.value).pipe(map(val => val === 'TEST' ? null : {asyncValidation: true}));
  }
}
