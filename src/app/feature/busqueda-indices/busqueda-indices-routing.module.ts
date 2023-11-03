import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaIndicesComponent } from './components/busqueda-indices.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIndicesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusquedaIndicesRoutingModule { }
