import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project.component';

import {
  ImgPipe,
  DocPipe,
  DlPipe
} from './path.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    ProjectComponent,
    ImgPipe,
    DocPipe,
    DlPipe
  ],
  providers: [
    Title
  ],
  bootstrap: [
   AppComponent
  ]
})
export class AppModule { }
