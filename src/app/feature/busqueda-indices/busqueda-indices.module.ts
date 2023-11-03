import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaIndicesComponent } from "./components/busqueda-indices.component";
import { BusquedaIndicesRoutingModule } from "./busqueda-indices-routing.module";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    BusquedaIndicesComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    BusquedaIndicesRoutingModule
  ],
  providers: []
})
export class BusquedaIndicesModule {}
