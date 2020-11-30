import {Sort, SortDirection} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {MatDrawerMode} from '@angular/material/sidenav';
import {AcTableLabels} from './ac-table-labels';
import {ThemePalette} from '@angular/material/core';
import {PageEvent} from '@angular/material/paginator';
import {AcTableHeaderItem} from './ac-table-header-item';
import {ComponentType} from '@angular/cdk/portal';
import {AcSubmitButton} from '../../ac-dynamic-form/models/submit-button';

export interface AcTableOptions {
  selection?: boolean;
  externalStore?: boolean;
  sort?: boolean;
  sortOptions?: {
    active?: string;
    direction?: SortDirection;
    disabled?: boolean;
    disableClear?: boolean;
    start?: 'asc' | 'desc';
    sortChange?: (sort: Sort, page?: PageEvent) => void;
    externalSort?: boolean;
    sortingDataAccessor?: ((data: any, sortHeaderId: string) => string | number);
    ignoreCase?: boolean;
  };
  pagination?: boolean;
  paginationOptions?: {
    pageSize?: number,
    pageSizeOptions?: number[],
    color?: ThemePalette,
    hidePageSize?: boolean,
    showFirstLastButtons?: boolean
    pageChange?: (page: PageEvent, sort?: Sort) => void;
    externalPagination?: boolean;
  };
  addRow?: boolean;
  addRowOptions?: {
    action?: (row: any) => Observable<any>;
    component?: ComponentType<any>;
  };
  editRow?: boolean;
  editRowOptions?: {
    action?: (row: any) => Observable<any>;
    component?: ComponentType<any>;
  };
  deleteRow?: boolean;
  deleteRowOptions?: {
    confirmation?: boolean;
    action?: (row: any) => Observable<any>;
  };
  globalFilter?: boolean;
  filter?: boolean;
  filterOptions?: {
    mode?: 'sidenav';
    sidenavOptions?: {
      mode?: MatDrawerMode;
      position?: 'start' | 'end';
      opened?: boolean;
      disableClose?: boolean;
    };
    externalFilter?: boolean;
    submitButton?: AcSubmitButton;
    debounceTime?: number;
    updateOn?: 'change' | 'blur' | 'submit';
  };
  exportCSV?: {
    fileName: string;
    separator?: string;
    addDoubleQuote?: boolean;
    formatDate?: string;
    externalExport?: () => void;
  };
  labels?: AcTableLabels;
  headerItems?: AcTableHeaderItem[];
}
