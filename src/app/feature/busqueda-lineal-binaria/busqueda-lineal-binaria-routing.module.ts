import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaLinealBinariaComponent } from './components/busqueda-lineal-binaria.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaLinealBinariaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusquedaLinealBinariaRoutingModule { }
