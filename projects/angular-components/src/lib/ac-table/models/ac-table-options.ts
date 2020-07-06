import {Sort, SortDirection} from '@angular/material/sort';

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
  editable?: 'cell' | 'row' | 'popup' | 'bottomSheet';
}
