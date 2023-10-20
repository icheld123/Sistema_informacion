import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaTransfClavesComponent } from "./components/busqueda-transf-claves.component";
import { BusquedaTransfClavesRoutingModule } from "./busqueda-transf-claves-routing.module";

@NgModule({
  declarations: [
    BusquedaTransfClavesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    BusquedaTransfClavesRoutingModule
  ],
  providers: [

  ]
})
export class BusquedaTransfClavesModule {}
