import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from 'angular-components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as moment from 'moment';
import {UpperCasePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    { provide: 'moment', useFactory: (): any => moment },
    UpperCasePipe,
    {provide: 'UpperCasePipe', useClass: UpperCasePipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
