import {Component, Input, OnInit} from '@angular/core';
import {AcFieldConfig} from '../../../ac-dynamic-form/models/field-config';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {AcDynamicForm} from '../../../ac-dynamic-form/models/dynamic-form';

@Component({
  selector: 'ac-sidenav-filter',
  templateUrl: './sidenav-filter.component.html',
  styleUrls: ['./sidenav-filter.component.css']
})
export class SidenavFilterComponent implements OnInit {
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  config: AcDynamicForm;

  constructor() {
  }

  ngOnInit(): void {
    const fields: AcFieldConfig[] = this.columns.filter(x => x.filterable).map(x => {
      let field = {};
      if (x.filterField) {
        Object.assign(field, x.filterField);
      } else {
        field = {type: 'input', name: x.key, label: x.label};
      }
      return field as AcFieldConfig;
    });
    this.config = {
      fields,
      submitButton: {
        label: 'Filter'
      }
    };
  }

  submit(values): void {
    console.log(values);
  }
}
