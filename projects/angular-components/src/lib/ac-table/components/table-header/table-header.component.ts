import {Component, EventEmitter, Output} from '@angular/core';
import {AcTableOptions} from '../../models/ac-table-options';
import {EditRowService} from '../../services/edit-row.service';
import {ExportCsvService} from '../../services/export-csv.service';
import {StoreService} from '../../services/store.service';
import {AcTableLabels} from '../../models/ac-table-labels';
import {AcTableHeaderItem} from '../../models/ac-table-header-item';

@Component({
  selector: 'ac-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Output() openFilter: EventEmitter<void> = new EventEmitter<void>();

  get filterBadge(): number {
    return this.storeService.filterValues ? Object.keys(this.storeService.filterValues).length : null;
  }

  get headerItems(): AcTableHeaderItem[] {
    return this.storeService.headerItems;
  }

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
