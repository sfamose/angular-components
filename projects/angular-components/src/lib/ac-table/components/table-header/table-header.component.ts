import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AcTableOptions} from '../../models/ac-table-options';
import {EditRowService} from '../../services/edit-row.service';
import {ExportCsvService} from '../../services/export-csv.service';
import {StoreService} from '../../services/store.service';
import {AcTableLabels} from '../../models/ac-table-labels';

@Component({
  selector: 'ac-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Output() openFilter: EventEmitter<void> = new EventEmitter<void>();

  get options(): AcTableOptions {
    return this.storeService.options;
  }

  get labels(): AcTableLabels {
    return this.storeService.labels;
  }

  constructor(private storeService: StoreService,
              private editService: EditRowService,
              private exportCsvService: ExportCsvService) {
  }

  ngOnInit(): void {
  }

  clickAddRow(): void {
    this.editService.openAddForm();
  }

  clickOpenFilter(): void {
    this.openFilter.emit();
  }

  clickExportCSV(): void {
    this.exportCsvService.exportCSV(this.storeService.options, this.storeService.columns, this.storeService.rows);
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.storeService.filterValue$.next(filterValue.trim().toLowerCase());
  }
}
