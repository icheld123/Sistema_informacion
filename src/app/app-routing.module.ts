import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inicio', loadChildren: () => import('./feature/inicio/inicio.module').then( m => m.InicioModule) },
  { path: 'busqueda-exp-parcial', loadChildren: () => import('./feature/busqueda-exp-parciales/busqueda-exp-parciales.module').then( m => m.BusquedaExpParcialesModule) },
  { path: 'busqueda-exp-total', loadChildren: () => import('./feature/busqueda-exp-totales/busqueda-exp-totales.module').then( m => m.BusquedaExpTotalesModule) },
  { path: 'busqueda-lineal-binaria', loadChildren: () => import('./feature/busqueda-lineal-binaria/busqueda-lineal-binaria.module').then( m => m.BusquedaLinealBinariaModule) },
  { path: 'busqueda-transf-claves', loadChildren: () => import('./feature/busqueda-transf-claves/busqueda-transf-claves.module').then( m => m.BusquedaTransfClavesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
