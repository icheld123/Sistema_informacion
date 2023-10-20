import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaExpTotalesComponent } from "./components/busqueda-exp-totales.component";
import { BusquedaExpTotalesRoutingModule } from "./busqueda-exp-totales-routing.module";

@NgModule({
  declarations: [
    BusquedaExpTotalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    BusquedaExpTotalesRoutingModule
  ],
  providers: [

  ]
})
export class BusquedaExpTotalesModule {}
