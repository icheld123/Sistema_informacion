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
    {path: 'busqueda-lineal-binaria', nombre: 'Secuencial y binaria'},
    {path: 'busqueda-transf-claves', nombre: 'Transformación de claves'},
    {path: 'busqueda-exp-parcial', nombre: 'Expansiones parciales'},
    {path: 'busqueda-exp-total', nombre: 'Expansiones totales'},
    {path: 'busqueda-indices', nombre: 'Índices'}
  ];

}
