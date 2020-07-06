import {NgModule} from '@angular/core';
import {AcDynamicFormModule} from './ac-dynamic-form/ac-dynamic-form.module';
import {AcTableModule} from './ac-table/ac-table.module';
import {AcPipeModule} from './ac-pipe/ac-pipe.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    AcDynamicFormModule,
    AcTableModule,
    AcPipeModule
  ]
})
export class AngularComponentsModule {
}
