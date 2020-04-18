export interface AcDynamicFormConfig {
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
}
