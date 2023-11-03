import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IndicesComponent } from "./components/indices.component";
import { IndicesRoutingModule } from "./indices-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    IndicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    IndicesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ]
})
export class IndicesModule{}
