import { Component } from '@angular/core';
import { MenuItem } from './core/models/menuItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto_sistema';
  public opciones: MenuItem[] = [
    {path: 'busqueda-lineal-binaria', nombre: 'Busqueda secuencial o binaria'},
    {path: 'busqueda-transf-claves', nombre: 'Busqueda por transformación de claves'},
    {path: 'busqueda-exp-parcial', nombre: 'Busqueda por expansiones parciales'},
    {path: 'busqueda-exp-total', nombre: 'Busqueda por expansiones totales'}
  ];

}
