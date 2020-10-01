import {Sort, SortDirection} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {MatDrawerMode} from '@angular/material/sidenav';

export interface AcTableOptions {
  sort?: {
    active?: string;
    direction?: SortDirection;
    disabled?: boolean;
    disableClear?: boolean;
    start?: 'asc' | 'desc';
    sortChange: (sort: Sort) => void;
  };
  selection?: boolean;
  addRow?: {
    addButtonLabel?: string;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    modalTitleLabel?: string;
    action?: (row: any) => Observable<any>;
  };
  editRow?: {
    editButtonLabel?: string;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    modalTitleLabel?: string;
    action?: (row: any) => Observable<any>;
  };
  deleteRow?: {
    deleteButtonLabel?: string;
    confirmation?: boolean;
    confirmationMessage?: string;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    modalTitleLabel?: string;
    action?: (row: any) => Observable<any>;
  };
  filter?: {
    filterButtonLabel?: string;
    mode?: 'sidenav';
    sidenavOptions?: {
      mode?: MatDrawerMode;
      position?: 'start' | 'end';
      opened?: boolean;
      disableClose?: boolean;
    };
  };
}
