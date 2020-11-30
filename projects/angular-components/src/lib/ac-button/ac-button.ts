import {ThemePalette} from '@angular/material/core';
import {MatBadgePosition, MatBadgeSize} from '@angular/material/badge';

export interface AcButton {
  label: string;
  type?: 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 'mat-icon-button' | 'mat-fab' | 'mat-mini-fab' | 'mat-menu-item';
  disabled?: boolean;
  disableRipple?: boolean;
  color?: ThemePalette;
  ariaLabel?: string;
  badge?: string;
  badgeOptions?: {
    position?: MatBadgePosition;
    color?: ThemePalette;
    size?: MatBadgeSize;
    description?: string;
    disabled?: boolean;
    hidden?: boolean;
    noOverlap?: boolean;
  };
}
