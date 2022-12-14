import {Component, Input, OnInit} from '@angular/core';
import {AcCell} from '../../models/ac-cell';
import {AcTableColumn} from '../../models/ac-table-column';
import {ToolsService} from '../../services/tools.service';

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

  get value() {
    return this.toolsService.getCellValue(this.element, this.column);
  }

  constructor(private toolsService: ToolsService) {
  }

  ngOnInit(): void {
  }
}
