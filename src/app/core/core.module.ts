import { CommonModule} from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MenuComponent
  ],
  providers: [

  ]
})
export class CoreModule {}
