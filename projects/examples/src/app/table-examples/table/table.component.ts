import {Component, OnInit, ViewChild} from '@angular/core';
import {AcTableColumn, AcTableComponent, AcTableOptions} from 'angular-components';
import {FormGroup, Validators} from '@angular/forms';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {AcFieldSelectConfig} from '../../../../../angular-components/src/lib/ac-dynamic-form/models/field-select-config';
import {AcFieldInputConfig} from '../../../../../angular-components/src/lib/ac-dynamic-form/models/field-input-config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('acTable') acTable: AcTableComponent;
  types = [{id: 1, label: 'Type1'}, {id: 2, label: 'Type2'}, {id: 3, label: 'Type3'}];
  columns: AcTableColumn[] = [
    {
      key: 'ordre',
      label: 'Ordre',
      getValue: (element: any) => {
        return (element.ordre % 2 === 0 ? 'a°' : 'N° ') + element.ordre;
      },
      fieldOrder: 3,
      field: {
        type: 'input',
        inputType: 'number',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'L\'ordre est obligatoire',
          },
        ],
      },
      filterable: true,
      filterField: {
        type: 'number',
      }
    },
    {
      key: 'code',
      label: 'Code',
      fieldOrder: 2,
      field: {
        type: 'input',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le code est obligatoire',
          },
          {
            name: 'pattern',
            validator: Validators.pattern(/[0-9]{3}/),
            message: 'Le code doit être composé de 3 chiffres',
          },
        ],
      },
      filterable: true
    },
    {
      key: 'libelle',
      label: 'Libellé',
      fieldOrder: 4,
      field: {
        type: 'textarea',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le libelle est obligatoire',
          },
        ],
      },
      mediaQueries: ['(min-width: 600px)'],
      filterable: true,
      filterField: {
        label: 'Libellé',
        type: 'chips',
      }
    },
    {
      key: 'type',
      label: 'Type',
      attributeKey: 'label',
      fieldOrder: 1,
      field: {
        type: 'select',
        options: this.types,
        required: true,
        getLabel: (item: any) => {
          return item.id + ' - ' + item.label;
        },
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le type est obligatoire',
          },
        ],
        onValueChanges: (value: any, field: AcFieldSelectConfig, group: FormGroup, fields: any[]) => {
          console.log(fields);
          const item = fields.filter(x => x.name === 'code')[0];
          if (item) {
            (item as AcFieldInputConfig).prefixes = [
              {label: 'test'}
            ];
          }
        }
      },
      mediaQueries: ['(min-width: 600px)'],
      filterable: true,
      filterField: {
        label: 'Type',
        type: 'select',
        options: [{id: 1, label: 'Type1'}, {id: 2, label: 'Type2'}, {id: 3, label: 'Type3'}],
        labelKey: 'label'
      }
    },
    {
      key: 'date',
      label: 'Date',
      pipe: {
        token: DatePipe,
        args: ['dd/MM/yyyy']
      },
      skipAddRow: 'hide',
      skipEditRow: 'hide',
      filterable: true,
      filterField: {
        type: 'date',
        label: 'Date de début',
        label2: 'Date de fin',
        operatorList: ['equal' , 'more' , 'moreOrEqual' , 'less' , 'lessOrEqual' , 'between']
      }
    },
    {
      key: 'copy',
      skipAddRow: 'hide',
      skipEditRow: 'hide',
      buttons: [
        {
          label: '<i class="fa fa-copy"></i>',
          action: (element, column) => {
            this.copy(element, column);
          }
        }
      ]
    }
  ];
  options: AcTableOptions = {
    selection: true,
    externalStore: false,
    sort: true,
    sortOptions: {
      active: 'code',
      direction: 'desc',
      disableClear: true,
      start: 'asc',
      sortChange: this.onSort,
      ignoreCase: true
    },
    pagination: true,
    paginationOptions: {
      pageSize: 25,
      pageSizeOptions: [25, 50, 100],
      pageChange: this.onPage
    },
    addRow: true,
    addRowOptions: {
      action: this.saveRow
    },
    editRow: true,
    editRowOptions: {
      action: this.saveRow
    },
    deleteRow: true,
    deleteRowOptions: {
      confirmation: true,
      action: this.delete
    },
    globalFilter: true,
    exportCSV: {
      fileName: 'export_[date].csv',
      formatDate: 'YYYY-MM-DD',
      exportFilteredData: true,
      addDoubleQuote: true
    },
    labels: {
      tableTitle: 'My table',
      addButtonLabel: '<i class="fas fa-plus"></i> Add a row',
      editButtonLabel: '<i class="fas fa-pencil-alt"></i>',
      deleteButtonLabel: '<i class="fas fa-trash-alt"></i>',
      exportButtonLabel: '<i class="fas fa-file-csv"></i> Export'
    },
    filter: true,
    filterOptions: {
      // filterButtonLabel: '<i class="fas fa-filter"></i>',
      mode: 'sidenav',
      // updateOn: 'blur',
      debounceTime: 500,
      badgeColor: 'accent',
      additionalfilters: [
        {key: 'key', label: 'test', type: 'checkbox'}
      ]
    },
    sidenavOptions: {
      position: 'end',
      mode: 'side',
      opened: true
    },
    columnManagement: true,
    headerItems: [
      {
        type: 'menu',
        options: {
          label: 'Menu',
          subMenuItems: [
            {type: 'addRow'},
            {type: 'export'},
            {
              type: 'custom',
              options: {
                label: 'Custom',
                action: () => {
                  console.log('test1');
                }
              }
            }
          ]
        },
        mediaQueries: ['(max-width: 600px)']
      },
      {type: 'addRow', mediaQueries: ['(min-width: 600px)']},
      {type: 'export', mediaQueries: ['(min-width: 600px)']},
      {type: 'filter'},
      {type: 'column'},
      {type: 'globalFilter'},
      {
        type: 'custom',
        options: {
          label: 'Custom',
          action: () => {
            console.log('test2');
          }
        }, mediaQueries: ['(min-width: 600px)']
      }
    ]
  };
  rows: any[];

  constructor() {

  }

  ngOnInit(): void {
    this.setRows();
  }

  setRows() {
    const rows = [];
    rows.push({
      id: 0,
      ordre: -1,
      code: '"Test"',
      type: 'Type1',
      libelle: 'Test ""Quote""',
      date: new Date()
    });

    for (let i = 0; i < 100; i++) {
      rows.push({
        id: i,
        ordre: i,
        code: (i % 2 === 0 ? 'C' : 'c') + 'ode' + i,
        type: (i % 2 === 0 ? this.types[0] : this.types[1]),
        libelle: 'libelle ' + i,
        date: new Date()
      });
    }
    this.rows = rows;
  }

  saveRow(row: any): Observable<any> {
    return row.code !== 'KO!' ? of(row).pipe(delay(1000)) : throwError('KO');
  }

  delete(row: any): Observable<any> {
    return row.code !== 'code0' ? of(row).pipe(delay(1000)) : throwError('KO');
  }

  onSort(sort: Sort, page: PageEvent): void {
    console.log(sort, page);
  }

  onPage(page: PageEvent, sort: Sort): void {
    console.log(sort, page);
  }

  logEvent(event: any) {
    console.log(event);
  }

  copy(element, column) {
    console.log(element, column);
    this.acTable.openAddForm(element);
  }

  addRow() {
    this.acTable.openAddForm({
      ordre: 1,
      code: 'test',
      libelle: 'test',
      type: 'Type1',
    });
  }

  changePage() {
    this.acTable.firstPage();
  }
}
