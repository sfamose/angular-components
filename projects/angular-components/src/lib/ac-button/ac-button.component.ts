import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AcButton} from './ac-button';
import {ThemePalette} from '@angular/material/core';
import {MatBadgePosition, MatBadgeSize} from '@angular/material/badge';

@Component({
  selector: 'ac-button',
  templateUrl: './ac-button.component.html',
  styleUrls: ['./ac-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcButtonComponent {
  @Input() config: AcButton;
  @Input() label: string;
  @Input() type: 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 'mat-icon-button' | 'mat-fab' | 'mat-mini-fab' | 'mat-menu-item';
  @Input() disabled: boolean;
  @Input() disableRipple: boolean;
  @Input() color: ThemePalette;
  @Input() ariaLabel: string;
  @Input() badge: string;
  @Input() badgePosition: MatBadgePosition;
  @Input() badgeColor: ThemePalette;
  @Input() badgeSize: MatBadgeSize;
  @Input() badgeDescription: string;
  @Input() badgeDisabled: boolean;
  @Input() badgeHidden: boolean;
  @Input() badgeNoOverlap: boolean;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  clickButton() {
    this.buttonClick.emit();
  }
}
