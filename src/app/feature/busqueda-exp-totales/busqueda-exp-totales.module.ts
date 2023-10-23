import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaExpTotalesComponent } from "./components/busqueda-exp-totales.component";
import { BusquedaExpTotalesRoutingModule } from "./busqueda-exp-totales-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    BusquedaExpTotalesComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    BusquedaExpTotalesRoutingModule,
    SharedModule
  ],
  providers: [

  ]
})
export class BusquedaExpTotalesModule {}
