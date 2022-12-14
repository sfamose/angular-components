import { Component, OnInit } from '@angular/core';
import {AcCell, AcTableColumn} from 'angular-components';

@Component({
  selector: 'app-gender-cell',
  templateUrl: './gender-cell.component.html',
  styleUrls: ['./gender-cell.component.scss']
})
export class GenderCellComponent implements OnInit, AcCell {

  column: AcTableColumn;
  element: any;

  get value(): boolean {
    return this.element && this.column ? this.element[this.column.key] : null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
