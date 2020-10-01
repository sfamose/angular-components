import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcButtonComponent} from './ac-button.component';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [AcButtonComponent],
  exports: [AcButtonComponent],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class AcButtonModule {
}
