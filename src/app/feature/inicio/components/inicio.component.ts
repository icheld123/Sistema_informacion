import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menuItems';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public opciones: MenuItem[] = [
    {path: '/busqueda-lineal-binaria', nombre: 'Busqueda secuencial o binaria'},
    {path: '/busqueda-transf-claves', nombre: 'Busqueda por transformación de claves'},
    {path: '/busqueda-exp-parcial', nombre: 'Busqueda por expansiones parciales'},
    {path: '/busqueda-exp-total', nombre: 'Busqueda por expansiones totales'}
  ];
}
