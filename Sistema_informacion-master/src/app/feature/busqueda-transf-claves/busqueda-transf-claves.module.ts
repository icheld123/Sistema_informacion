import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BusquedaTransfClavesComponent } from "./components/busqueda-transf-claves.component";
import { BusquedaTransfClavesRoutingModule } from "./busqueda-transf-claves-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    BusquedaTransfClavesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BusquedaTransfClavesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ]
})
export class BusquedaTransfClavesModule {}
