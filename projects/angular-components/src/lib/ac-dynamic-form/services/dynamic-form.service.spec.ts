import {async, TestBed} from '@angular/core/testing';

import {DynamicFormService} from './dynamic-form.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('DynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule],
    providers: [DynamicFormService]
  }));

  it('should be created', () => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    expect(service).toBeTruthy();
  });

  it('createGroup calls createControl', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'createControl').and.callThrough();
    service.createGroup([{type: 'input', name: 'test2'}]);
    expect(service.createControl).toHaveBeenCalled();
  }));

  it('updateForm calls removeItems', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'removeItems');
    service.createForm([]);
    service.updateForm([]);
    expect(service.removeItems).toHaveBeenCalled();
  }));

  it('updateForm calls addItems', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'addItems');
    service.createForm([]);
    service.updateForm([]);
    expect(service.addItems).toHaveBeenCalled();
  }));

  it('updateForm calls updateItems', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'updateItems');
    service.createForm([]);
    service.updateForm([]);
    expect(service.updateItems).toHaveBeenCalled();
  }));

  it('addItems calls createControl', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'createControl').and.callThrough();
    const form: FormGroup = new FormGroup({test: new FormControl('')});
    service.addItems(form, [{type: 'input', name: 'test2'}]);
    expect(service.createControl).toHaveBeenCalled();
  }));

  it('addItems add a field to the form', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    const form: FormGroup = new FormGroup({test: new FormControl('')});
    service.addItems(form, [{type: 'input', name: 'test2'}]);
    expect(form.controls.test).toBeTruthy();
    expect(form.controls.test2).toBeTruthy();
  }));

  it('addItems calls createGroup', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'createGroup').and.callThrough();
    const form: FormGroup = new FormGroup({test: new FormControl('')});
    service.addItems(form, [{type: 'group', name: 'test2', fields: []}]);
    expect(service.createGroup).toHaveBeenCalled();
  }));

  it('addItems add a group to the form', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    const form: FormGroup = new FormGroup({test: new FormControl('')});
    service.addItems(form, [{type: 'group', name: 'test2', fields: []}]);
    expect(form.controls.test).toBeTruthy();
    expect(form.controls.test2).toBeTruthy();
  }));

  it('removeItems remove a field from the form', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    const form: FormGroup = new FormGroup({
      test: new FormControl(''),
      test2: new FormControl('')
    });
    expect(form.controls.test).toBeTruthy();
    expect(form.controls.test2).toBeTruthy();
    service.removeItems(form, [{type: 'input', name: 'test2'}]);
    expect(form.controls.test).toBeFalsy();
    expect(form.controls.test2).toBeTruthy();
  }));

  it('updateItems calls updateGroup', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'updateGroup');
    const form: FormGroup = new FormGroup({group: new FormGroup({})});
    service.updateItems(form, [{type: 'group', name: 'group'}]);
    expect(service.updateGroup).toHaveBeenCalled();
  }));

  it('updateItems disables field', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'updateGroup');
    const form: FormGroup = new FormGroup({test: new FormControl('')});
    expect(form.controls.test.enabled).toBeTrue();
    service.updateItems(form, [{type: 'input', name: 'test', disabled: true}]);
    expect(form.controls.test.enabled).toBeFalse();
  }));

  it('updateItems enables field', async(() => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    spyOn(service, 'updateGroup');
    const form: FormGroup = new FormGroup({test: new FormControl({value: '', disabled: true})});
    expect(form.controls.test.enabled).toBeFalse();
    service.updateItems(form, [{type: 'input', name: 'test', disabled: false}]);
    expect(form.controls.test.enabled).toBeTrue();
  }));
});
