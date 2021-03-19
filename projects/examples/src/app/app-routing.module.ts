import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./form-examples/form-examples.module').then(mod => mod.FormExamplesModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./table-examples/table-examples.module').then(mod => mod.TableExamplesModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar-examples/calendar-examples.module').then(mod => mod.CalendarExamplesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
