import {Component, OnInit, ViewChild} from '@angular/core';
import {AcFieldSelectConfig, AcTableColumn, AcTableComponent, AcTableOptions} from 'angular-components';
import {FormGroup, Validators} from '@angular/forms';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('acTable') acTable: AcTableComponent;
  columns: AcTableColumn[] = [
    {
      key: 'ordre',
      label: 'Ordre',
      exportable: true,
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
      }
    },
    {
      key: 'code',
      label: 'Code',
      exportable: true,
      field: {
        type: 'input',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le code est obligatoire',
          },
        ],
      },
      filterable: true
    },
    {
      key: 'libelle',
      label: 'Libellé',
      exportable: true,
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
        name: 'libelle',
        label: 'Libellé',
        type: 'chipsInput',
        deleteLabel: '<i class="fas fa-times"></i>'
      }
    },
    {
      key: 'type',
      label: 'Type',
      exportable: true,
      field: {
        type: 'select',
        options: ['Type1', 'Type2'],
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le type est obligatoire',
          },
        ],
      },
      mediaQueries: ['(min-width: 600px)'],
      filterable: true,
      filterField: {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [{id: 1, type: 'Type1'}, {id: 2, type: 'Type2'}],
        labelKey: 'type',
        multiple: true,
        startHint: {
          label: 'Deselect all', action: (field, group) => {
            group.controls[field.name].setValue(null);
          }
        },
        endHint: {
          label: 'Select all', action: (field: AcFieldSelectConfig, group: FormGroup) => {
            group.controls[field.name].setValue(field.options);
          }
        }
      }
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
      exportFilteredData: true
    },
    labels: {
      addButtonLabel: '<i class="fas fa-plus"></i> Add a row',
      editButtonLabel: '<i class="fas fa-pencil-alt"></i>',
      deleteButtonLabel: '<i class="fas fa-trash-alt"></i>',
      exportButtonLabel: '<i class="fas fa-file-csv"></i> Export'
    },
    filter: true,
    filterOptions: {
      // filterButtonLabel: '<i class="fas fa-filter"></i>',
      mode: 'sidenav',
      sidenavOptions: {
        position: 'end',
        mode: 'side',
        opened: true
      },
      // updateOn: 'blur',
      debounceTime: 500,
      badgeColor: 'accent'
    },
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
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: i,
        ordre: i,
        code: (i % 2 === 0 ? 'C' : 'c') + 'ode' + i,
        type: (i % 2 === 0 ? 'Type1' : 'Type2'),
        libelle: 'libelle ' + i
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

  addRow() {
    this.acTable.openAddForm({
      ordre: 1,
      code: 'test',
      libelle: 'test',
      type: 'Type1',
    });
  }
}
