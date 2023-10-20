import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaTransfClavesComponent } from './components/busqueda-transf-claves.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaTransfClavesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusquedaTransfClavesRoutingModule { }
