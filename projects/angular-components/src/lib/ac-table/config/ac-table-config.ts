export interface AcTableLabels {
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  addButtonLabel?: string;
  addModalTitleLabel?: string;
  editButtonLabel?: string;
  editModalTitleLabel?: string;
  deleteButtonLabel?: string;
  deleteConfirmationMessage?: string;
  deleteModalTitleLabel?: string;
}


export interface AcTableConfig {
  labels?: AcTableLabels;
  dynamicForm?: {
    dateFormat?: {
      parse: {
        dateInput: string | string[];
      },
      display: {
        dateInput: string;
        monthYearLabel: string;
        dateA11yLabel: string;
        monthYearA11yLabel: string;
      }
    };
    locale?: string;
    matFormFieldAppearance?: string;
    matFormFieldFloatlabel?: string;
    inputMaxlength?: number;
  };
}
