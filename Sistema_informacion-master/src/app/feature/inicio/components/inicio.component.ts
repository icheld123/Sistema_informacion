import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menuItems';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public opciones: MenuItem[] = [
    {path: '/busqueda-lineal-binaria', nombre: 'Estructura de busqueda secuencial o binaria'},
    {path: '/busqueda-transf-claves', nombre: 'Estructura de busqueda por transformación de claves'},
    {path: '/busqueda-exp-parcial', nombre: 'Estructura de busqueda por expansiones parciales'},
    {path: '/busqueda-exp-total', nombre: 'Estructura de busqueda por expansiones totales'},
    {path: '/indices',nombre: 'Indices'}
  ];
}
