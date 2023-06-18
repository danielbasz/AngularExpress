import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { DataEditComponent } from './components/data-edit/data-edit.component';
import { DataDetailComponent } from './components/data-detail/data-detail.component';
import { DataCreateComponent } from './components/data-create/data-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    DataEditComponent,
    DataDetailComponent,
    DataCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
