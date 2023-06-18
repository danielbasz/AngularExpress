import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './components/data-list/data-list.component';
import { DataCreateComponent } from './components/data-create/data-create.component';
import { DataEditComponent } from './components/data-edit/data-edit.component';
import { DataDetailComponent } from './components/data-detail/data-detail.component';

const routes: Routes = [
  { path: '', component: DataListComponent },
  { path: 'create', component: DataCreateComponent },
  { path: 'edit/:id', component: DataEditComponent },
  { path: 'detail/:id', component: DataDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
