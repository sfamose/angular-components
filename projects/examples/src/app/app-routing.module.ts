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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
