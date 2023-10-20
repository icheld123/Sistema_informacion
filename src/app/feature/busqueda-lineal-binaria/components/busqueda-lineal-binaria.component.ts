import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda-lineal-binaria',
  templateUrl: './busqueda-lineal-binaria.component.html',
  styleUrls: ['./busqueda-lineal-binaria.component.css']
})
export class BusquedaLinealBinariaComponent {
  private datos: number[] = [];
  public formulario: FormGroup;

  constructor(){}

  busquedaBinaria(arr: number[], num: number): number {
    let izq: number = 0;
    let der: number = arr.length - 1;

    while (izq <= der) {
      const mid: number = izq + Math.floor((der - izq) / 2);

      if (arr[mid] === num) {
        return mid;
      } else if (arr[mid] < num) {
        izq = mid + 1;
      } else {
        der = mid - 1;
      }
    }

    return -1;
  }

  busquedaSecuencial(arr: number[], num: number): number {
    num = Math.floor(num);
    let index: number = -1;
    let pos: number = 0;

    for (const item of arr) {
      if (item === num) {
        index = pos;
        break;
      }
      pos++;
    }

    return index;
  }

  ordenar(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
      const clave: number = arr[i];
      let izq: number = 0;
      let der: number = i - 1;

      while (izq <= der) {
        const mid: number = Math.floor((izq + der) / 2);

        if (arr[mid] < clave) {
          izq = mid + 1;
        } else {
          der = mid - 1;
        }
      }

      for (let j = i; j >= izq + 1; j--) {
        arr[j] = arr[j - 1];
      }

      arr[izq] = clave;
    }

    return arr;
  }

  getTam(): void{

  }

  getDatos(): void {
    try {
      const valor: number = this.formulario.value.dato;

      if (!isNaN(valor)) {
        this.datos.push(valor);
      } else {
        console.log("\n¡Error! Debe ingresar un número entero.");
      }
    } catch (error) {
      console.log("\n¡Error! Debe ingresar un número entero.");
    }
    console.log(this.datos.length)
    for (let i in this.datos){
      console.log(this.datos[i]);
    }
    this.formulario.reset();
  }

  private construirFormulario(){
    this.formulario = new FormGroup({
      dato: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }
}
