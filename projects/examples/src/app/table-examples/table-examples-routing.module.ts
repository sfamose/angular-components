import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from './table/table.component';
import {ResponsiveComponent} from './responsive/responsive.component';
import {SelectionComponent} from './selection/selection.component';
import {PaginationComponent} from './pagination/pagination.component';
import {EditionComponent} from './edition/edition.component';


const routes: Routes = [
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'table', component: TableComponent},
  {path: 'responsive', component: ResponsiveComponent},
  {path: 'selection', component: SelectionComponent},
  {path: 'pagination', component: PaginationComponent},
  {path: 'edition', component: EditionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableExamplesRoutingModule { }
