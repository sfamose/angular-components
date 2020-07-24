import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormModalComponent } from './dynamic-form-modal.component';
import {AcDynamicFormComponent, MaterialModule} from 'angular-components';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormService} from '../services/dynamic-form.service';

describe('DynamicFormModalComponent', () => {
  let component: DynamicFormModalComponent;
  let fixture: ComponentFixture<DynamicFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule],
      declarations: [ DynamicFormModalComponent, AcDynamicFormComponent ],
      providers: [
        DynamicFormService,
        { provide: MAT_DIALOG_DATA, useValue: {fields: []} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
