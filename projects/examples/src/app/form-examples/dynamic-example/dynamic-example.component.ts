import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AcDynamicForm, AcDynamicFormComponent, AcFieldConfig} from 'angular-components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-example',
  templateUrl: './dynamic-example.component.html',
  styleUrls: ['./dynamic-example.component.scss']
})
export class DynamicExampleComponent implements OnInit, AfterViewInit, OnDestroy {
  config: AcDynamicForm = {
    fields: []
  };
  private index = 1;
  @ViewChild(AcDynamicFormComponent, {static: true}) private formComponent: AcDynamicFormComponent;
  private unsubcribe$: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.formComponent.changes.pipe(takeUntil(this.unsubcribe$)).subscribe(values => console.log(values));
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  addItem() {
    this.config = {
      fields: this.config.fields.concat({
        name: 'item' + this.index,
        type: 'group',
        className: 'todolist',
        fields: [
          {
            name: 'completed',
            type: 'checkbox'
          },
          {
            name: 'label',
            type: 'input',
            label: 'Item ' + this.index,
            suffixes: [{
              label: '<i class="fa fa-times"></i>',
              action: (field: AcFieldConfig) => {
                this.deleteItem(field);
              }
            }]
          }
        ]
      })
    };
    this.index++;
  }

  deleteItem(field: AcFieldConfig) {
    this.config.fields.splice(this.config.fields.indexOf(field), 1);
    this.config = {
      fields: this.config.fields
    };
  }
}
