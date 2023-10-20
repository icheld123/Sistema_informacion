import { Component } from '@angular/core';

@Component({
  selector: 'app-busqueda-exp-totales',
  templateUrl: './busqueda-exp-totales.component.html',
  styleUrls: ['./busqueda-exp-totales.component.css']
})
export class BusquedaExpTotalesComponent {
  private filas: number = 3;
  private columnas: number = 2;
  private densidad: number = 0.85;
  private tabla: Array<Array<number | null>> = Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));
  private diccColisiones: { [key: string]: number[] } = {};
  private expansionCount: number = 1;

  // insertar(valor: number) {
  //   if (this.validarExistenciaClave(valor)) {
  //     const indice = valor % this.columnas;
  //     const todasFilasOcupadas = this.tabla.every(row => row[indice] !== null);

  //     if (todasFilasOcupadas) {
  //       this.agregarColision(indice, valor);
  //     } else {
  //       const fila = this.filaVacia(indice);
  //       this.tabla[fila][indice] = valor;
  //     }

  //     if ((this.cantidadClaves() + this.contarNumColisiones()) / (this.filas * this.columnas) >= this.densidad) {
  //       this.expansionParcial();
  //     }
  //   } else {
  //     console.log(`\nLa clave ${valor} que desea agregar ya existe`);
  //   }
  // }

  contarNumColisiones() {
    let suma = 0;
    for (const valor of Object.values(this.diccColisiones)) {
      suma += valor.length;
    }
    return suma;
  }

  agregarColision(indice: number, valor: number) {
    const strIndice = String(indice);
    if (strIndice in this.diccColisiones) {
      this.diccColisiones[strIndice].push(valor);
    } else {
      this.diccColisiones[strIndice] = [valor];
    }
    console.log("Estructura de colisiones:\n", this.diccColisiones);
  }

  cantidadClaves() {
    let total = 0;
    for (const fila of this.tabla) {
      for (const valor of fila) {
        if (valor !== null) {
          total++;
        }
      }
    }
    return total;
  }

  validarExistenciaClave(clave: number) {
    return this.tabla.flat().every(valor => valor !== clave);
  }

  filaVacia(colIndice: number, tabla: Array<Array<number | null>> | null = null) {
    const tablaOriginal = tabla || this.tabla;
    for (let fila = 0; fila < this.filas; fila++) {
      if (tablaOriginal[fila][colIndice] === null) {
        return fila;
      }
    }
    return null;
  }

  expansionParcial() {
    const i = this.expansionCount;
    const nuevoTam = Math.floor(1.5 ** i * this.columnas);

    const nuevaTabla = Array.from({ length: this.filas }, () => Array(nuevoTam).fill(null));

    for (let filaIndice = 0; filaIndice < this.filas; filaIndice++) {
      for (let col = 0; col < this.columnas; col++) {
        const valor = this.tabla[filaIndice][col];
        if (valor !== null) {
          const nuevoIndice = valor % (Math.floor(1.5 ** i * this.columnas));
          const nuevaFila = this.filaVacia(nuevoIndice, nuevaTabla);
          if (nuevaFila !== null) {
            nuevaTabla[nuevaFila][nuevoIndice] = valor;
          } else {
            this.agregarColision(nuevoIndice, valor);
          }
        }
      }
    }

    const auxColisiones: number[] = [];
    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % (Math.floor(1.5 ** i * this.columnas));
        const fila = this.filaVacia(indice, nuevaTabla);
        if (fila !== null) {
          nuevaTabla[fila][indice] = numero;
        } else {
          auxColisiones.push(numero);
        }
      }
    }

    this.columnas = nuevoTam;
    this.tabla = nuevaTabla;
    this.expansionCount++;
  }
}
