import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaLinealBinariaComponent } from "./components/busqueda-lineal-binaria.component";
import { BusquedaLinealBinariaRoutingModule } from "./busqueda-lineal-binaria-routing.module";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    BusquedaLinealBinariaComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    BusquedaLinealBinariaRoutingModule
  ],
  providers: []
})
export class BusquedaLinealBinariaModule {}
