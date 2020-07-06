import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AcDynamicPipe} from './ac-dynamic.pipe';



@NgModule({
  declarations: [AcDynamicPipe],
  exports: [AcDynamicPipe],
  imports: [
    CommonModule
  ]
})
export class AcPipeModule { }
