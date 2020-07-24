import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AcTableColumn} from '../../models/ac-table-column';
import {AcFieldConfig} from '../../../ac-dynamic-form/models/field-config';
import {DynamicFormModalComponent} from '../../../ac-dynamic-form/dynamic-form-modal/dynamic-form-modal.component';
import {AcTableOptions} from '../../models/ac-table-options';
import {DynamicFormModalData} from '../../../ac-dynamic-form/models/dynamic-form-modal-data';
import {LABELS} from '../../config/default-config';
import {AcTableLabels} from '../../config/ac-table-config';

@Component({
  selector: 'ac-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Input()
  columns: AcTableColumn[];
  @Input() options: AcTableOptions;
  @Output() rowAdd: EventEmitter<any> = new EventEmitter<any>();
  addButtonLabel: string;

  constructor(public dialog: MatDialog, @Inject(LABELS) public labels: AcTableLabels) {
  }

  ngOnInit(): void {
    this.addButtonLabel = this.options && this.options.addRow && this.options.addRow.addButtonLabel ?
      this.options.addRow.addButtonLabel : this.labels.addButtonLabel;
  }

  clickAddRow() {
    const fields: AcFieldConfig[] = this.columns.filter(x => x.addable).map(x => {
      let field = {};
      if (x.field) {
        Object.assign(field, x.field);
      } else {
        field = {type: 'input', name: x.key, label: x.label};
      }
      return field as AcFieldConfig;
    });
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      data: {
        fields,
        submitButtonLabel: this.options.addRow.submitButtonLabel ? this.options.addRow.submitButtonLabel : this.labels.submitButtonLabel,
        cancelButtonLabel: this.options.addRow.cancelButtonLabel ? this.options.addRow.cancelButtonLabel : this.labels.cancelButtonLabel,
        titleLabel: this.options.addRow.modalTitleLabel ? this.options.addRow.modalTitleLabel : this.labels.addModalTitleLabel,
      } as DynamicFormModalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowAdd.emit(result);
      }
    });
  }
}
