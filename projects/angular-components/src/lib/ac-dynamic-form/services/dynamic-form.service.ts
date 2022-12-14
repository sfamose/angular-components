import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AcFieldConfig} from '../models/field-config';
import {AcGroupConfig} from '../models/group-config';
import {AcTextConfig} from '../models/text-config';

@Injectable()
export class DynamicFormService {
  private form: FormGroup;
  private fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[];

  constructor(private fb: FormBuilder) {
  }

  getForm(): FormGroup {
    return this.form;
  }

  createForm(fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[], updateOn: 'change' | 'blur' | 'submit') {
    const formFields = fields.filter(x => x.type !== 'text') as (AcFieldConfig | AcGroupConfig)[];
    this.form = this.createGroup(formFields, updateOn);
  }

  createGroup(fields: (AcFieldConfig | AcGroupConfig)[], updateOn: 'change' | 'blur' | 'submit') {
    const config = updateOn ? {updateOn} : {};
    const group = this.fb.group({}, config);
    fields.forEach(control => {
      if (!control.name) {
        throw new Error(
          `this attribute "name" is required`
        );
      }
      if (control.type === 'group') {
        group.addControl(control.name, this.createGroup((control as AcGroupConfig).fields as AcFieldConfig[], null));
      } else {
        group.addControl(control.name, this.createControl(control));
      }
    });
    return group;
  }

  createControl(config: AcFieldConfig) {
    const {disabled, validations, value} = config;
    return this.fb.control({disabled, value},
      validations ? validations.filter(x => x.validator).map(x => x.validator) : [],
      validations ? validations.filter(x => x.asyncValidator).map(x => x.asyncValidator) : []
    );
  }

  updateForm(fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    this.updateGroup(this.form, fields);
  }

  updateGroup(form: FormGroup, fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    this.removeItems(form, fields);
    this.addItems(form, fields);
    this.updateItems(form, fields);
  }

  removeItems(form: FormGroup, fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    const newControls = (fields.filter(x => x.type !== 'text') as (AcFieldConfig | AcGroupConfig)[]).map(item => item.name);
    Object.keys(form.controls).filter(control => !newControls.includes(control)).forEach(control => form.removeControl(control));
  }

  addItems(form: FormGroup, fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    const formFields = fields.filter(x => x.type !== 'text') as (AcFieldConfig | AcGroupConfig)[];
    formFields
      .map(item => item.name)
      .filter(control => !Object.keys(form.controls).includes(control))
      .forEach(name => {
        const config = formFields.find(control => control.name === name);
        if (config.type === 'group') {
          form.addControl(name, this.createGroup((config as AcGroupConfig).fields as AcFieldConfig[], null));
        } else {
          form.addControl(name, this.createControl(config as AcFieldConfig));
        }
      });
  }

  updateItems(form: FormGroup, fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    const newControls = (fields.filter(x => x.type !== 'text') as (AcFieldConfig | AcGroupConfig)[]).map(item => item.name);
    Object.keys(form.controls).filter(control => newControls.includes(control)).forEach(control => {
      const groupItem = (fields.filter(x => x.type === 'group') as AcGroupConfig[]).filter(x => x.name === control)[0];
      const fieldItem = (fields.filter(x => x.type !== 'text' && x.type !== 'group') as AcFieldConfig[]).filter(x => x.name === control)[0];
      if (groupItem) {
        this.updateGroup(form.get(control) as FormGroup, groupItem.fields);
      }
      if (fieldItem && fieldItem.disabled) {
        form.get(control).disable();
      }
      if (fieldItem && !fieldItem.disabled) {
        form.get(control).enable();
      }
    });
  }

  getFields(): (AcFieldConfig | AcTextConfig | AcGroupConfig)[] {
    return this.fields;
  }

  setFields(fields: (AcFieldConfig | AcTextConfig | AcGroupConfig)[]) {
    this.fields = fields;
  }
}
