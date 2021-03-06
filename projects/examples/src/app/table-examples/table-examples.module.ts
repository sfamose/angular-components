import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableExamplesRoutingModule} from './table-examples-routing.module';
import {TableComponent} from './table/table.component';
import {AcTableModule} from '../../../../angular-components/src/lib/ac-table/ac-table.module';
import {ResponsiveComponent} from './responsive/responsive.component';
import {SelectionComponent} from './selection/selection.component';
import {PaginationComponent} from './pagination/pagination.component';
import {EditionComponent} from './edition/edition.component';
import { GenderCellComponent } from './edition/gender-cell/gender-cell.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    TableComponent,
    ResponsiveComponent,
    SelectionComponent,
    PaginationComponent,
    EditionComponent,
    GenderCellComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    TableExamplesRoutingModule,
    AcTableModule.setConfig({
      dynamicForm: {
        locale: 'fr'
      }
    })
  ]
})
export class TableExamplesModule {
}
