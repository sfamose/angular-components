import {ThemePalette} from '@angular/material/core';

export interface AcButton {
  label: string;
  type?: 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 'mat-icon-button' | 'mat-fab' | 'mat-mini-fab';
  disabled?: boolean;
  disableRipple?: boolean;
  color?: ThemePalette;
  ariaLabel?: string;
}
