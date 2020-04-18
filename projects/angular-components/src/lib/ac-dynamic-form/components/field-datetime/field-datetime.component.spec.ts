import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldDatetimeComponent} from './field-datetime.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_LOCALE,
  DEFAULT_MAT_FORM_FIELD_APPEARANCE,
  DEFAULT_MAT_FORM_FIELD_FLOATLABEL,
  MAT_FORM_FIELD_APPEARANCE,
  MAT_FORM_FIELD_FLOATLABEL
} from '../../config/default-config';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {InputDatetimeComponent} from '../input-datetime/input-datetime.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

describe('FieldDatetimeComponent', () => {
  let component: FieldDatetimeComponent;
  let fixture: ComponentFixture<FieldDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [FieldDatetimeComponent, InputDatetimeComponent],
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: DEFAULT_LOCALE}, {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE]
        }, {provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMAT},
        {
          provide: MAT_FORM_FIELD_APPEARANCE,
          useValue: DEFAULT_MAT_FORM_FIELD_APPEARANCE
        },
        {
          provide: MAT_FORM_FIELD_FLOATLABEL,
          useValue: DEFAULT_MAT_FORM_FIELD_FLOATLABEL
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDatetimeComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'datetime', name: 'test'};
    fixture.componentInstance.group = new FormGroup({test: new FormControl('')});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-form-field').classList).toContain('ac-dynamic-field');
  });

  it('should have the class "ac-dynamic-field-datetime"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-form-field').classList).toContain('ac-dynamic-field-datetime');
  });

  // Tests mat-form-field
  it('should have classes defined by field.className', () => {
    fixture.componentInstance.field.className = 'classTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('mat-form-field').classList).toContain('classTest');

    fixture.componentInstance.field.className = ['classTest1', 'classTest2'];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('mat-form-field').classList).not.toContain('classTest');
    expect(fixture.debugElement.nativeElement.querySelector('mat-form-field').classList).toContain('classTest1');
    expect(fixture.debugElement.nativeElement.querySelector('mat-form-field').classList).toContain('classTest2');
  });

  it('should have the label defined by field.label', () => {
    fixture.componentInstance.field.label = 'labelTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('label')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('label').textContent).toEqual('labelTest');
  });

  it('should have the input name defined field.name', () => {
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('ac-input-datetime[ng-reflect-name=test]');
    expect(myField).toBeTruthy();
  });

  it('should have required defined by field.required', () => {
    fixture.componentInstance.field.required = true;
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('ac-input-datetime[ng-reflect-required=true]');
    expect(myField).toBeTruthy();
  });

  it('should have the appearance defined by field.appearance', () => {
    fixture.componentInstance.field.appearance = 'legacy';
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('mat-form-field[ng-reflect-appearance=legacy]');
    expect(myField).toBeTruthy();
  });

  it('should have the float label defined by field.floatLabel', () => {
    fixture.componentInstance.field.floatLabel = 'always';
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('mat-form-field[ng-reflect-float-label=always]');
    expect(myField).toBeTruthy();
  });

  it('should have the hideRequiredMarker defined by field.hideRequiredMarker', () => {
    fixture.componentInstance.field.hideRequiredMarker = true;
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    const myField = el.querySelector('mat-form-field[ng-reflect-hide-required-marker=true]');
    expect(myField).toBeTruthy();
  });

  describe('Prefixe', () => {
    it('could be added', () => {
      fixture.componentInstance.field.prefixes = [{label: 'test'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matPrefix]');
      expect(myField).toBeTruthy();
    });

    it('do not have a button if no action defined', () => {
      fixture.componentInstance.field.prefixes = [{label: '<i class="fa fas fa-user"></i>'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matPrefix] > button');
      expect(myField).toBeFalsy();
    });

    it('should have a label if no action defined', () => {
      fixture.componentInstance.field.prefixes = [{label: 'test'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matPrefix]');
      expect(myField.textContent).toContain('test');
    });


    it('should have a button if an action is defined', () => {
      fixture.componentInstance.field.prefixes = [{
        label: '<i class="fa fas fa-user"></i>', action: () => {
        }
      }];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matPrefix] > button');
      expect(myField).toBeTruthy();
    });

    it('the button should have a label if an action is defined', () => {
      fixture.componentInstance.field.prefixes = [{
        label: 'test', action: () => {
        }
      }];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matPrefix] > button');
      expect(myField.textContent).toContain('test');
    });
  });

  describe('Suffixe', () => {
    it('could be added', () => {
      fixture.componentInstance.field.suffixes = [{label: 'test'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matSuffix]');
      expect(myField).toBeTruthy();
    });

    it('do not have a button if no action defined', () => {
      fixture.componentInstance.field.suffixes = [{label: '<i class="fa fas fa-user"></i>'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matSuffix] > button');
      expect(myField).toBeFalsy();
    });

    it('should have a label if no action defined', () => {
      fixture.componentInstance.field.suffixes = [{label: 'test'}];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matSuffix]');
      expect(myField.textContent).toContain('test');
    });


    it('should have a button if an action is defined', () => {
      fixture.componentInstance.field.suffixes = [{
        label: '<i class="fa fas fa-user"></i>', action: () => {
        }
      }];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matSuffix] > button');
      expect(myField).toBeTruthy();
    });

    it('the button should have a label if an action is defined', () => {
      fixture.componentInstance.field.suffixes = [{
        label: 'test', action: () => {
        }
      }];
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('span[matSuffix] > button');
      expect(myField.textContent).toContain('test');
    });
  });

  describe('StartHint', () => {
    it('could be added', () => {
      fixture.componentInstance.field.startHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=start]');
      expect(myField).toBeTruthy();
    });

    it('do not have a button if no action defined', () => {
      fixture.componentInstance.field.startHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=start] button');
      expect(myField).toBeFalsy();
    });

    it('should have a label if no action defined', () => {
      fixture.componentInstance.field.startHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=start]');
      expect(myField.textContent).toContain('test');
    });


    it('should have a button if an action is defined', () => {
      fixture.componentInstance.field.startHint = {
        label: 'test', action: () => {
        }
      };
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=start] button');
      expect(myField).toBeTruthy();
    });

    it('the button should have a label if an action is defined', () => {
      fixture.componentInstance.field.startHint = {
        label: 'test', action: () => {
        }
      };
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=start] button');
      expect(myField.textContent).toContain('test');
    });
  });

  describe('EndHint', () => {
    it('could be added', () => {
      fixture.componentInstance.field.endHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=end]');
      expect(myField).toBeTruthy();
    });

    it('do not have a button if no action defined', () => {
      fixture.componentInstance.field.endHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=end] button');
      expect(myField).toBeFalsy();
    });

    it('should have a label if no action defined', () => {
      fixture.componentInstance.field.endHint = {label: 'test'};
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=end]');
      expect(myField.textContent).toContain('test');
    });


    it('should have a button if an action is defined', () => {
      fixture.componentInstance.field.endHint = {
        label: 'test', action: () => {
        }
      };
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=end] button');
      expect(myField).toBeTruthy();
    });

    it('the button should have a label if an action is defined', () => {
      fixture.componentInstance.field.endHint = {
        label: 'test', action: () => {
        }
      };
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      const myField = el.querySelector('mat-hint[ng-reflect-align=end] button');
      expect(myField.textContent).toContain('test');
    });
  });

  describe('onValueChanges', () => {
    it('is called if the value changes', async(() => {
      fixture.componentInstance.field.onValueChanges = () => {
      };
      spyOn(fixture.componentInstance.field, 'onValueChanges');
      fixture.componentInstance.ngOnInit();
      fixture.componentInstance.group.get(fixture.componentInstance.field.name).setValue(null);
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          expect(fixture.componentInstance.field.onValueChanges).toHaveBeenCalled();
        });
    }));
  });

  describe('buttonAction', () => {
    it('call the method defined', async(() => {
      fixture.componentInstance.field.startHint = {
        label: 'test', action: () => {
        }
      };
      spyOn(fixture.componentInstance.field.startHint, 'action');
      const mouseenter = new MouseEvent('mouseenter');
      fixture.componentInstance.buttonAction(mouseenter, fixture.componentInstance.field.startHint);
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          expect(fixture.componentInstance.field.startHint.action).toHaveBeenCalled();
        });
    }));
  });
});
