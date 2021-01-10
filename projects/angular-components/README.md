
# AngularComponents

## Table of contents
* [Getting started](#getting-started)
* [AcDynamicFormModule](#acdynamicformmodule)


## Getting started
Install angular-components through npm:
```angular2html
npm install --save @sfamose/angular-components
```

peer dependencies : 
* @angular/cdk (>=10.0.1)
* @angular/material (>=10.0.1)
* @angular/material-moment-adapter (>=10.0.1)
* moment (>=2.24.0")

## AcDynamicFormModule
Import the acDynamicFormModule module into your app's module:
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AcDynamicFormModule} from '@sfamose/angular-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AcDynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next, add the form configuration in the component
```typescript
config: AcDynamicForm = {
    fields: [
      {
        name: 'test',
        type: 'input',
        label: 'Test'
      }
    ]
}
```

Then, add the dynamic form in the template
```angular2html
<ac-dynamic-form [config]="config"></ac-dynamic-form>
```
