import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaExpTotalesComponent } from "./components/busqueda-exp-totales.component";
import { BusquedaExpTotalesRoutingModule } from "./busqueda-exp-totales-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    BusquedaExpTotalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BusquedaExpTotalesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ]
})
export class BusquedaExpTotalesModule {}
