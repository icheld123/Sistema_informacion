import { Component } from '@angular/core';

@Component({
  selector: 'app-busqueda-exp-parciales',
  templateUrl: './busqueda-exp-parciales.component.html',
  styleUrls: ['./busqueda-exp-parciales.component.css']
})
export class BusquedaExpParcialesComponent {
  filas: number = 3;
  columnas: number = 2;
  densidad: number = 0.85;
  tabla: number[][] = Array.from({ length: this.filas }, () => new Array(this.columnas).fill(null));
  tam: number = 0;
  arrColisiones: number[] = [];
  diccColisiones: { [key: string]: number[] } = {};
  expansionCount: number = 1;

  constructor() {}

  // insertar(valor: number): void {
  //   if (this.validarExistenciaClave(valor)) {
  //     const indice = valor % this.columnas;

  //     const todasFilasOcupadas = this.tabla.every(
  //       (row) => row[indice] !== null
  //     );

  //     if (todasFilasOcupadas) {
  //       this.agregarColision(indice, valor);
  //     } else {
  //       const fila = this.filaVacia(indice);
  //       this.tabla[fila][indice] = valor;
  //     }

  //     if (
  //       (this.cantidadClaves() + this.contarNumColisiones()) /
  //         (this.filas * this.columnas) >=
  //       this.densidad
  //     ) {
  //       this.expansionParcial();
  //     }
  //   } else {
  //     console.log(`\nLa clave ${valor} que desea agregar ya existe`);
  //   }
  // }

  contarNumColisiones(): number {
    let suma = 0;
    for (const valores of Object.values(this.diccColisiones)) {
      suma += valores.length;
    }
    return suma;
  }

  agregarColision(indice: number, valor: number): void {
    const strIndice = indice.toString();
    if (strIndice in this.diccColisiones) {
      this.diccColisiones[strIndice].push(valor);
    } else {
      this.diccColisiones[strIndice] = [valor];
    }

    console.log("Estructura de colisiones:\n", this.diccColisiones);
  }

  cantidadClaves(): number {
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

  validarExistenciaClave(clave: number): boolean {
    let noExisteClave = true;
    for (const fila of this.tabla) {
      for (const valor of fila) {
        if (valor === clave) {
          noExisteClave = false;
        }
      }
    }
    return noExisteClave;
  }

  filaVacia(colIndice: number, tabla?: number[][]): number | null {
    const tablaOriginal = tabla || this.tabla;
    for (let fila = 0; fila < this.filas; fila++) {
      if (tablaOriginal[fila][colIndice] === null) {
        return fila;
      }
    }
    return null;
  }

  expansionParcial(): void {
    const i = this.expansionCount;
    const nuevoTam = Math.floor(Math.pow(1.5, i) * this.columnas);

    const nuevaTabla = Array.from({ length: this.filas }, () =>
      new Array(nuevoTam).fill(null)
    );

    for (let filaIndice = 0; filaIndice < this.filas; filaIndice++) {
      for (let col = 0; col < this.columnas; col++) {
        const valor = this.tabla[filaIndice][col];
        if (valor !== null) {
          const nIndice = valor % Math.floor(Math.pow(1.5, i) * this.columnas);
          const nFila = this.filaVacia(nIndice, nuevaTabla);
          if (nFila !== null) {
            nuevaTabla[nFila][nIndice] = valor;
          } else {
            this.agregarColision(nIndice, valor);
          }
        }
      }
    }

    const auxColisiones: number[] = [];
    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % Math.floor(Math.pow(1.5, i) * this.columnas);
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

  buscar(valorBuscar: number): string {
    valorBuscar = parseInt(valorBuscar.toString());
    let numFila = 0;
    let resultado = "";

    for (const fila of this.tabla) {
      numFila++;
      if (fila.includes(valorBuscar)) {
        resultado = `La clave ${valorBuscar} se encuentra en la fila ${numFila} y columna ${valorBuscar % this.columnas}`;
      }
    }

    for (const [clave, valor] of Object.entries(this.diccColisiones)) {
      for (const numero of valor) {
        if (parseInt(clave) === valorBuscar) {
          resultado = `La clave ${valorBuscar} se encuentra en la posición ${clave} del diccionario de colisiones`;
        }
      }
    }

    if (resultado === "") {
      resultado = `La clave ${valorBuscar} no se encuentra en la estructura`;
    }

    return resultado;
  }

  toString(): string {
    return this.tabla.map((fila) => fila.join(" ")).join("\n");
  }

  eliminar(valorRecibido: number): void {
    let seElimino = false;
    const valorEliminar = parseInt(valorRecibido.toString());

    for (const [clave, valor] of Object.entries(this.diccColisiones)) {
      for (let i = valor.length - 1; i >= 0; i--) {
        if (valor[i] === valorEliminar) {
          valor.splice(i, 1);
          seElimino = true;
        }
      }
    }

    // for (const fila of this.tabla) {
    //   for (let i = 0; i < fila.length; i++) {
    //     if (fila[i] === valorEliminar) {
    //       fila[i] = null;
    //       seElimino = true;
    //     }
    //   }
    // }

    if (!seElimino) {
      console.log(`La clave ${valorRecibido} que desea eliminar no existe`);
    }

    if (
      (this.cantidadClaves() + this.contarNumColisiones()) / this.columnas <=
      1.05
    ) {
      if (this.columnas >= 4) {
        this.reduccionParcial();
      }
    }
  }

  reduccionParcial(): void {
    const i = this.expansionCount;

    const nuevoTam = Math.floor(Math.pow(1.5, i - 1) * this.columnas);

    const nuevaTabla = Array.from({ length: this.filas }, () =>
      new Array(nuevoTam).fill(null)
    );

    for (let filaIndice = 0; filaIndice < this.filas; filaIndice++) {
      for (let col = 0; col < nuevoTam; col++) {
        const valor = this.tabla[filaIndice][col];
        if (valor !== null) {
          const newIndice = valor % nuevoTam;
          const newFila = this.filaVacia(newIndice, nuevaTabla);
          if (newFila !== null) {
            nuevaTabla[newFila][newIndice] = valor;
          } else {
            this.agregarColision(newIndice, valor);
          }
        }
      }
    }

    const auxColisiones: number[] = [];
    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % nuevoTam;
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
    this.expansionCount--;

    this.diccColisiones = {};
    for (const numero of auxColisiones) {
      const newIndice = numero % nuevoTam;
      this.agregarColision(newIndice, numero);
    }
  }
}
