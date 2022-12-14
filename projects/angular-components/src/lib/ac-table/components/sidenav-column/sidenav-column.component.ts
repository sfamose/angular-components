import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AcTableColumn} from '../../models/ac-table-column';
import {StoreService} from '../../services/store.service';
import {AcTableLabels} from '../../models/ac-table-labels';

@Component({
  selector: 'ac-sidenav-column',
  templateUrl: './sidenav-column.component.html',
  styleUrls: ['./sidenav-column.component.scss']
})
export class SidenavColumnComponent implements OnInit {
  @Output() closeColumn: EventEmitter<void> = new EventEmitter<void>();
  @Output() columnChange: EventEmitter<void> = new EventEmitter<void>();

  get labels(): AcTableLabels {
    return this.storeService.labels;
  }

  get columns(): AcTableColumn[] {
    return this.storeService.columns;
  }

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.closeColumn.emit();
  }

  selectionChange(column: AcTableColumn) {
    column.hide = !column.hide;
    this.storeService.setDisplayedColumns();
    this.columnChange.emit();
  }
}
