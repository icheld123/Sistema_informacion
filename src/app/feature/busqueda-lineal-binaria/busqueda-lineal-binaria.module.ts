import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BusquedaLinealBinariaComponent } from "./components/busqueda-lineal-binaria.component";
import { BusquedaLinealBinariaRoutingModule } from "./busqueda-lineal-binaria-routing.module";


@NgModule({
  declarations: [
    BusquedaLinealBinariaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BusquedaLinealBinariaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class BusquedaLinealBinariaModule {}
