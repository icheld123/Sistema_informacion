import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InicioComponent } from "./components/inicio.component";
import { InicioRoutingModule } from "./inicio-routing.module";

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    InicioRoutingModule
  ],
  providers: [

  ]
})
export class InicioModule {}
