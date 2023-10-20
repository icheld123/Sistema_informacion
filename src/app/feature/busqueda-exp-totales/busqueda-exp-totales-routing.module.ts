import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaExpTotalesComponent } from './components/busqueda-exp-totales.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaExpTotalesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusquedaExpTotalesRoutingModule { }
