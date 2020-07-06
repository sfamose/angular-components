import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {AcPipeModule} from '../ac-pipe/ac-pipe.module';
import {CustomCellDirective} from './components/custom-cell.directive';
import {MaterialModule} from '../material.module';
import { TableCellComponent } from './components/table-cell/table-cell.component';


@NgModule({
  declarations: [TableComponent, CustomCellDirective, TableCellComponent],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AcPipeModule
  ]
})
export class AcTableModule {
}
