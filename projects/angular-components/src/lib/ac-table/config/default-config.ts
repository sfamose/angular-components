import {InjectionToken} from '@angular/core';
import {AcTableLabels} from './ac-table-config';

export const LABELS = new InjectionToken<string>('LABELS');

export const DEFAULT_LABELS: AcTableLabels = {
  cancelButtonLabel: 'Cancel',
  submitButtonLabel: 'Save',
  addButtonLabel: 'Add a row',
  addModalTitleLabel: 'Add a row',
  editButtonLabel: 'Edit',
  editModalTitleLabel: 'Edit a row',
  deleteButtonLabel: 'Delete',
  deleteConfirmationMessage: 'Confirm the deletion of the row',
  deleteModalTitleLabel: 'Delete a row',
  filterButtonLabel: 'Filter'
};
