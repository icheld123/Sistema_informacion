import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicesComponent } from './components/indices.component';

const routes: Routes = [
  {
    path: '',
    component: IndicesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IndicesRoutingModule { }
