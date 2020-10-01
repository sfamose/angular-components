import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {LABELS} from '../../config/default-config';
import {AcTableLabels} from '../../config/ac-table-config';
import {EditRowService} from '../../services/edit-row.service';

@Component({
  selector: 'ac-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Input()
  columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() openFilter: EventEmitter<void> = new EventEmitter<void>();
  addButtonLabel: string;
  filterButtonLabel: string;

  constructor(@Inject(LABELS) public labels: AcTableLabels,
              private editService: EditRowService) {
  }

  ngOnInit(): void {
    this.addButtonLabel = this.options && this.options.addRow && this.options.addRow.addButtonLabel ?
      this.options.addRow.addButtonLabel : this.labels.addButtonLabel;
    this.filterButtonLabel = this.options && this.options.filter && this.options.filter.filterButtonLabel ?
      this.options.filter.filterButtonLabel : this.labels.addButtonLabel;
  }

  clickAddRow() {
    this.editService.openAddForm(this.columns, this.options);
  }

  clickOpenFilter() {
    this.openFilter.emit();
  }
}
