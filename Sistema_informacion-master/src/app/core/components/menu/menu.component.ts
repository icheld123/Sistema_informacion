import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menuItems';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input()
  items: MenuItem[];
}
