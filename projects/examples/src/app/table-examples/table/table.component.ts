import {Component, OnInit} from '@angular/core';
import {AcTableColumn, AcTableOptions} from 'angular-components';
import {Validators} from '@angular/forms';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columns: AcTableColumn[] = [
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
        type: 'input',
        required: true,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Le libelle est obligatoire',
          },
        ],
      },
    },
  ];
  options: AcTableOptions = {
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
      formatDate: 'YYYY-MM-DD'
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
        mode: 'over',
        opened: false
      }
    }
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
        code: (i % 2 === 0 ? 'C' : 'c') + 'ode' + i,
        libelle: 'libelle ' + i
      });
    }
    this.rows = rows;
  }

  saveRow(row: any): Observable<any> {
    row.code += '!';
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
}
