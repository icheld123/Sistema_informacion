import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaExpParcialesComponent } from "./components/busqueda-exp-parciales.component";
import { BusquedaExpParcialesRoutingModule } from "./busqueda-exp-parciales-routing.module";


@NgModule({
  declarations: [
    BusquedaExpParcialesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    BusquedaExpParcialesRoutingModule
  ],
  providers: [

  ]
})
export class BusquedaExpParcialesModule {}
