import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcTableOptions} from '../../models/ac-table-options';
import {MatSort, Sort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {LABELS} from '../../config/default-config';
import {AcTableLabels} from '../../config/ac-table-config';
import {EditRowService} from '../../services/edit-row.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ac-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnChanges, AfterViewInit {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ViewChild('container', {static: true}) container: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  editButtonLabel: string;
  deleteButtonLabel: string;

  constructor(public dialog: MatDialog,
              @Inject(LABELS) public labels: AcTableLabels,
              private editService: EditRowService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDisplayedColumns();

    if (this.options && this.options.editRow) {
      this.editButtonLabel = this.options.editRow.editButtonLabel ?
        this.options.editRow.editButtonLabel : this.labels.editButtonLabel;
    }
    if (this.options && this.options.deleteRow) {
      this.deleteButtonLabel = this.options.deleteRow.deleteButtonLabel ?
        this.options.deleteRow.deleteButtonLabel : this.labels.deleteButtonLabel;
    }
    this.dataSource.sort = this.sort;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.setDisplayedColumns();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setDisplayedColumns();
    }, 0);
  }

  onResize() {
    this.setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.displayedColumns = this.options && !!this.options.selection ? ['select'] : [];

    const width = this.container.nativeElement.offsetWidth;
    const cols = this.columns ? this.columns.filter(x =>
      !x.hide && (!x.visibleIfMinWidth || width >= x.visibleIfMinWidth) && (!x.visibleIfMaxWidth || width <= x.visibleIfMaxWidth)
    ).map(x => x.key) : [];

    if (this.options && this.options.editRow) {
      cols.push('editRow');
    }
    if (this.options && this.options.deleteRow) {
      cols.push('deleteRow');
    }
    this.displayedColumns = this.displayedColumns.concat(cols);
  }

  onSortChange(sort: Sort) {
    if (this.options && this.options.sort && this.options.sort.sortChange) {
      this.options.sort.sortChange(sort);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectChange.emit(this.selection.selected);
  }

  toggle(row: any) {
    this.selection.toggle(row);
    this.selectChange.emit(this.selection.selected);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  openEditForm(row: any) {
    this.editService.openEditForm(row, this.columns, this.options);
  }

  openConfirmDeleteMessage(row: any) {
    this.editService.openConfirmDeleteMessage(row, this.options);
  }

}
