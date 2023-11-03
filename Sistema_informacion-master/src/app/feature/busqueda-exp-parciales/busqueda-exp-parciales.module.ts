import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaExpParcialesComponent } from "./components/busqueda-exp-parciales.component";
import { BusquedaExpParcialesRoutingModule } from "./busqueda-exp-parciales-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    BusquedaExpParcialesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BusquedaExpParcialesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ]
})
export class BusquedaExpParcialesModule {}
