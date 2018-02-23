import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { TreeDiagramComponent } from './tree-diagram.component';


@NgModule({
  declarations: [
    AppComponent,
    TreeDiagramComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
