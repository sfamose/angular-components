import {Component, Input, OnInit} from '@angular/core';
import {AcCell} from '../../models/ac-cell';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableConversions} from '../../models/ac-table-conversions';

@Component({
  selector: 'ac-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit, AcCell {
  @Input()
  element: any;
  @Input()
  column: AcTableColumn;

  constructor() {
  }

  ngOnInit(): void {
  }
}
