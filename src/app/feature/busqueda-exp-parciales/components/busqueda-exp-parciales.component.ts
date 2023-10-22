import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';

const OUT_OF_RANGE: number = -1;

@Component({
  selector: 'app-busqueda-exp-parciales',
  templateUrl: './busqueda-exp-parciales.component.html',
  styleUrls: ['./busqueda-exp-parciales.component.css']
})
export class BusquedaExpParcialesComponent {
  filas: number = 3;
  columnas: number = 2;
  densidad: number = 0.85;
  public formularioAgregar: FormGroup;
  public formularioBusqueda: FormGroup;
  tabla: Array<Array<number | null>> = Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));
  tam: number = 0;
  arrColisiones: number[] = [];
  public filaBuscado: number;
  public filaBuscadoColision: number;
  public colBuscado: number;
  public mensaje: string;
  public busquedaIniciada: boolean = false;
  diccColisiones: { [key: string]: number[] } = {};
  expansionCount: number = 1;

  constructor() {}

  insertar(valor: number): void {
    if (this.validarExistenciaClave(valor)) {
      const indice = valor % this.columnas;

      const todasFilasOcupadas = this.tabla.every(
        (row) => row[indice] !== null
      );

      if (todasFilasOcupadas) {
        this.agregarColision(indice, valor);
      } else {
        const fila = this.filaVacia(indice);
        if(fila != null){
          this.tabla[fila][indice] = valor;
        }
      }

      if (
        (this.cantidadClaves() + this.contarNumColisiones()) /
          (this.filas * this.columnas) >=
        this.densidad
      ) {
        this.expansionParcial();
      }
    } else {
      alert(`\nLa clave ${valor} que desea agregar ya existe`);
    }
  }

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
    this.columnas += Math.round(this.columnas * 0.4);
    const nueva_tabla: number[][] = Array.from(
      { length: this.filas },
      () => Array(this.columnas).fill(null)
    );

    for (let fila_indice = 0; fila_indice < this.filas; fila_indice++) {
      for (let col = 0; col < Math.floor(this.columnas * 0.75); col++) {
        const valor = this.tabla[fila_indice][col];
        if (valor !== null) {
          const new_indice = valor % this.columnas;
          const new_fila = this.fila_vacia(new_indice, nueva_tabla);
          if (new_fila !== null) {
            nueva_tabla[new_fila][new_indice] = valor;
          } else {
            this.agregar_colision(new_indice, valor);
          }
        }
      }
    }

    const aux_colisiones: number[] = [];
    for (const valores of Object.values(this.diccColisiones)) {
      for (const numero of valores) {
        const indice = numero % this.columnas;
        const fila = this.fila_vacia(indice, nueva_tabla);
        if (fila !== null) {
          nueva_tabla[fila][indice] = numero;
        } else {
          aux_colisiones.push(numero);
        }
      }
    }

    this.diccColisiones = {};
    for (const numero of aux_colisiones) {
      const new_indice = numero % this.columnas;
      this.agregar_colision(new_indice, numero);
    }

    this.tabla = nueva_tabla;
  }

  fila_vacia(col_indice: number, tabla?: (number | null)[][]): number | null {
    const tabla_original = tabla || this.tabla;
    for (let fila = 0; fila < this.filas; fila++) {
      if (tabla_original[fila][col_indice] === null) {
        return fila;
      }
    }
    return null;
  }

  agregar_colision(indice: number, valor: number): void {
    const str_indice = indice.toString();
    if (str_indice in this.diccColisiones) {
      this.diccColisiones[str_indice].push(valor);
    } else {
      this.diccColisiones[str_indice] = [valor];
    }
  }


  buscar(valorBuscar: number): void {
    let existeClave = false;
    let numFila = 0;

    for (const fila of this.tabla) {
      numFila++;
      if (fila.includes(valorBuscar)) {
        existeClave = true;
        this.filaBuscado = numFila - 1;
        this.colBuscado = valorBuscar % this.columnas;
        this.filaBuscadoColision = OUT_OF_RANGE;
        this.mensaje = `La clave ${valorBuscar} se encuentra en la fila ${numFila} y columna ${valorBuscar % this.columnas}`;
      }
    }

    console.log("buscado: " + valorBuscar)
    for (const [clave, valor] of Object.entries(this.diccColisiones)) {
      for (const numero of valor) {
        console.log("clave: " + parseInt(clave))
        if (numero === valorBuscar) {
          existeClave = true;
          this.filaBuscado = OUT_OF_RANGE;
          this.colBuscado = OUT_OF_RANGE;
          this.filaBuscadoColision = parseInt(clave, 10);
          this.mensaje = `La clave ${valorBuscar} se encuentra en la posición ${clave} del diccionario de colisiones`;
        }
      }
    }

    if (!existeClave) {
      this.colBuscado = OUT_OF_RANGE;
      this.filaBuscado = OUT_OF_RANGE;
      this.filaBuscadoColision = OUT_OF_RANGE;
      this.mensaje = `La clave ${valorBuscar} no se encuentra en la estructura`;
    }
  }

  toString(): string {
    return this.tabla.map((fila) => fila.join(" ")).join("\n");
  }

  eliminar(valor_recibido: number): void {
    let se_elimino = false;

    for (const valores of Object.values(this.diccColisiones)) {
      for (let i = 0; i < valores.length; i++) {
        if (valor_recibido === valores[i]) {
          valores.splice(i, 1);
          i--;
          se_elimino = true;
        }
      }
    }

    for (const fila of this.tabla) {
      for (let i = 0; i < fila.length; i++) {
        if (valor_recibido === fila[i]) {
          fila[i] = null;
          se_elimino = true;
        }
      }
    }

    if (!se_elimino) {
      console.log(`La clave ${valor_recibido} que desea eliminar no existe`);
    }

    if (
      (this.cantidadClaves() + this.contarNumColisiones()) / this.columnas <=
      1.05
    ) {
      if (this.columnas >= 3) {
        this.reduccionParcial();
      }
    }
  }


  reduccionParcial(): void {
    this.columnas = Math.round(this.columnas / 1.5);
    const nueva_tabla: (number | null)[][] = Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));

    for (let fila_indice = 0; fila_indice < this.filas; fila_indice++) {
      for (let col = 0; col < this.columnas * 1.5; col++) {
        const valor = this.tabla[fila_indice][col];
        if (valor !== null) {
          const new_indice = valor % this.columnas;
          const new_fila = this.fila_vacia(new_indice, nueva_tabla);
          if (new_fila !== null) {
            nueva_tabla[new_fila][new_indice] = valor;
          } else {
            this.agregar_colision(new_indice, valor);
          }
        }
      }
    }

    const aux_colisiones: number[] = [];

    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % this.columnas;
        const fila = this.fila_vacia(indice, nueva_tabla);
        if (fila !== null) {
          nueva_tabla[fila][indice] = numero;
        } else {
          aux_colisiones.push(numero);
        }
      }
    }

    this.diccColisiones = {};

    for (const numero of aux_colisiones) {
      const new_indice = numero % this.columnas;
      this.agregar_colision(new_indice, numero);
    }

    this.tabla = nueva_tabla;
  }


  public iniciarAccion(opcion: number): void{
    if(this.formularioBusqueda.valid){
      let valorIngresado = parseInt(this.formularioBusqueda.value.buscar, 10)
      if(opcion == 1){
        this.busquedaIniciada = true;
        console.log(this.buscar(valorIngresado));
        this.formularioBusqueda.reset();
      }
      else{
        this.busquedaIniciada = false;
        this.colBuscado = OUT_OF_RANGE;
        this.filaBuscado = OUT_OF_RANGE;
        this.eliminar(valorIngresado);
        this.formularioBusqueda.reset();
      }
    }
  }

  public convertirStringEnNumero(valor: string){
    return parseInt(valor);
  }

  getDatos(): void {
    if(this.formularioAgregar.valid){
      let valorIngresado = parseInt(this.formularioAgregar.value.dato, 10)
      this.insertar(valorIngresado);
      this.formularioAgregar.reset();
    }
  }

  private construirFormulario(){
    this.formularioAgregar = new FormGroup({
      dato: new FormControl("", [Validators.required, isNumberPositiveValidator()])
    });
  }

  private construirFormularioBuscar(){
    this.formularioBusqueda = new FormGroup({
      buscar: new FormControl("", [Validators.required, isNumberPositiveValidator()])
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.construirFormularioBuscar();
  }
}


