import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menuItems';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public externas: MenuItem[] = [
    {path: '/busqueda-exp-parcial', nombre: 'Estructura de expansiones parciales'},
    {path: '/busqueda-exp-total', nombre: 'Estructura de expansiones totales'}
  ];
  public internas: MenuItem[] = [
    {path: '/busqueda-lineal-binaria', nombre: 'Estructura secuencial y binaria'},
    {path: '/busqueda-transf-claves', nombre: 'Estructura transformación de claves'},
  ];
}
