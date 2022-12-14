import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from 'angular-components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as moment from 'moment';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    IonicModule.forRoot()
  ],
  providers: [
    { provide: 'moment', useFactory: (): any => moment },
    UpperCasePipe,
    {provide: 'UpperCasePipe', useClass: UpperCasePipe},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
