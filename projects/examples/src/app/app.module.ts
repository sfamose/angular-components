import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from 'angular-components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as moment from 'moment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [{ provide: 'moment', useFactory: (): any => moment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
