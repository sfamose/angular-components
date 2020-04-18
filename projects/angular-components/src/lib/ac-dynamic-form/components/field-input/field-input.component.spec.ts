import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FieldInputComponent} from './field-input.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import {
  DEFAULT_INPUT_MAXLENGTH,
  DEFAULT_MAT_FORM_FIELD_APPEARANCE,
  DEFAULT_MAT_FORM_FIELD_FLOATLABEL, INPUT_MAXLENGTH,
  MAT_FORM_FIELD_APPEARANCE,
  MAT_FORM_FIELD_FLOATLABEL
} from '../../config/default-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('FieldInputComponent', () => {
  let component: FieldInputComponent;
  let fixture: ComponentFixture<FieldInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [FieldInputComponent],
      providers: [
        {
          provide: MAT_FORM_FIELD_APPEARANCE,
          useValue: DEFAULT_MAT_FORM_FIELD_APPEARANCE
        },
        {
          provide: MAT_FORM_FIELD_FLOATLABEL,
          useValue: DEFAULT_MAT_FORM_FIELD_FLOATLABEL
        },
        {
          provide: INPUT_MAXLENGTH,
          useValue: DEFAULT_INPUT_MAXLENGTH
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldInputComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.field = {type: 'input', name: 'inputName'};
    fixture.componentInstance.group = new FormGroup({inputName: new FormControl('')});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the class "ac-dynamic-field"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-form-field').classList).toContain('ac-dynamic-field');
  });

  it('should have the class "ac-dynamic-field-input"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-form-field').classList).toContain('ac-dynamic-field-input');
  });

  it('should have the input type defined by field.inputType', () => {
    fixture.componentInstance.field.inputType = 'number';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').type).toEqual('number');
  });

  it('should have maxlength defined by field.maxlength', () => {
    fixture.componentInstance.field.maxlength = 20;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').maxLength).toEqual(20);
  });

  it('should have autocomplete defined by field.autocomplete', () => {
    fixture.componentInstance.field.autocomplete = 'off';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').autocomplete).toEqual('off');
  });

  it('should have readonly defined by field.readonly', () => {
    fixture.componentInstance.field.readonly = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').readOnly).toEqual(true);
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
    const myField = el.querySelector('input[ng-reflect-name=inputName]');
    expect(myField).toBeTruthy();
  });

  it('should have the placeholder defined by field.placeholder', () => {
    fixture.componentInstance.field.placeholder = 'placeholderTest';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').placeholder).toEqual('placeholderTest');
  });

  it('should have required defined by field.required', () => {
    fixture.componentInstance.field.required = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('input').required).toEqual(true);
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
      fixture.componentInstance.group.get(fixture.componentInstance.field.name).setValue('test');
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
