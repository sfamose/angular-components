import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputDatetimeComponent} from './input-datetime.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import * as moment from 'moment';
import {Moment} from 'moment';
import {AcFieldDatetimeConfig} from '../../models/field-datetime-config';

describe('InputDatetimeComponent', () => {
  let component: InputDatetimeComponent;
  let fixture: ComponentFixture<InputDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],
      declarations: [InputDatetimeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatetimeComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'datetime', name: 'test'};
    fixture.componentInstance.group = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterDate', () => {
    it('if a filter is not defined, return tru', async(() => {
      expect(fixture.componentInstance.filterDate(moment())).toEqual(true);
    }));

    it('if a filter is defined, it should have benn called', async(() => {
      fixture.componentInstance.field.filter = (d: Moment | null, field?: AcFieldDatetimeConfig, group?: FormGroup) => {
        return true;
      };
      spyOn(fixture.componentInstance.field, 'filter');
      fixture.componentInstance.filterDate(moment());
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          expect(fixture.componentInstance.field.filter).toHaveBeenCalled();
        });
    }));
  });

  it('onChange has been call in the method onDatePickerClose', async(() => {
    spyOn(fixture.componentInstance, 'onChange');
    fixture.componentInstance.onDatePickerClose();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.onChange).toHaveBeenCalled();
      });
  }));

  it('onChange has been call in the method onTimePickerClose', async(() => {
    spyOn(fixture.componentInstance, 'onChange');
    fixture.componentInstance.onTimePickerClose();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.componentInstance.onChange).toHaveBeenCalled();
      });
  }));
});
