import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';

const OUT_OF_RANGE: number = -1;
const CLAVE_EXISTE: string = "La clave a ingresar ya existe.";

@Component({
  selector: 'app-busqueda-exp-totales',
  templateUrl: './busqueda-exp-totales.component.html',
  styleUrls: ['./busqueda-exp-totales.component.css']
})
export class BusquedaExpTotalesComponent {
  public datos: number[] = [];
  public formularioAgregar: FormGroup;
  public formularioBusqueda: FormGroup;
  private filas: number = 3;
  private columnas: number = 2;
  private densidad: number = 0.85;
  public tabla: Array<Array<number | null>> = Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));
  public diccColisiones: { [key: string]: number[] } = {};
  public filaBuscado: number;
  public filaBuscadoColision: number;
  public colBuscado: number;
  public busquedaIniciada: boolean = false;
  public mensaje: string = "";

  private insertar(valor: number): void {
    if (this.validarExistenciaClave(valor)) {
      const indice = valor % this.columnas;
      const todas_filas_ocupadas = this.tabla.every((row) => row[indice] !== null);

      if (todas_filas_ocupadas) {
        this.agregarColision(indice, valor);
      } else {
        const fila = this.filaVacia(indice);
        if (fila != null){
          this.tabla[fila][indice] = valor;
        }
      }

      const factorCarga = (this.cantidadClaves() + this.contarNumColisiones()) /
        (this.filas * this.columnas);

      if (factorCarga >= this.densidad) {
        this.expansionTotal();
      }
    } else {
      alert(CLAVE_EXISTE);
    }
  }

  private agregarColision(indice: number, valor: number) {
    const strIndice = String(indice);
    if (strIndice in this.diccColisiones) {
      this.diccColisiones[strIndice].push(valor);
    } else {
      this.diccColisiones[strIndice] = [valor];
    }
  }


  private validarExistenciaClave(clave: number) {
    return this.tabla.flat().every(valor => valor !== clave);
  }

  private filaVacia(colIndice: number, tabla: Array<Array<number | null>> | null = null) {
    const tablaOriginal = tabla || this.tabla;
    for (let fila = 0; fila < this.filas; fila++) {
      if (tablaOriginal[fila][colIndice] === null) {
        return fila;
      }
    }
    return null;
  }

  private expansionTotal(): void {
    this.columnas *= 2;
    const nueva_tabla: number[][] = Array.from({ length: this.filas }, () => Array(this.columnas).fill(null));

    for (let fila_indice = 0; fila_indice < this.filas; fila_indice++) {
      for (let col = 0; col < this.columnas / 2; col++) {
        const valor = this.tabla[fila_indice][col];
        if (valor !== null) {
          const new_indice = valor % this.columnas;
          const new_fila = this.filaVacia(new_indice, nueva_tabla);
          if (new_fila !== null) {
            nueva_tabla[new_fila][new_indice] = valor;
          } else {
            // Manejar la colisión aquí si no se encuentra una fila válida
            this.agregarColision(new_indice, valor);
          }
        }
      }
    }

    const aux_colisiones: number[] = [];
    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % this.columnas;
        const fila = this.filaVacia(indice, nueva_tabla);
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
      this.agregarColision(new_indice, numero);
    }

    this.tabla = nueva_tabla;
  }

  private buscar(valor_buscar: number): void {
    let existeClave = false;
    let num_fila = 0;
    for (const fila of this.tabla) {
      num_fila++;
      if (fila.includes(valor_buscar)) {
        existeClave = true;
        this.filaBuscado = num_fila - 1;
        this.colBuscado = valor_buscar % this.columnas;
        this.filaBuscadoColision = OUT_OF_RANGE;
        this.mensaje = `\nLa clave ${valor_buscar} se encuentra en la fila ${num_fila} y columna ${valor_buscar % this.columnas}`;
      }
    }

    for (const [clave, valor] of Object.entries(this.diccColisiones)) {
      for (const numero of valor) {
        if (numero === valor_buscar) {
          existeClave = true;
          this.colBuscado = OUT_OF_RANGE;
          this.filaBuscado = OUT_OF_RANGE;
          this.filaBuscadoColision = parseInt(clave, 10);
          this.mensaje = `\nLa clave ${valor_buscar} se encuentra en la posición ${clave} del diccionario de colisiones`;
        }
      }
    }

    if (!existeClave) {
      this.colBuscado = OUT_OF_RANGE;
      this.filaBuscado = OUT_OF_RANGE;
      this.filaBuscadoColision = OUT_OF_RANGE;
      this.mensaje = `\nLa clave ${valor_buscar} no se encuentra en la estructura`;
    }
  }

  private eliminar(valor_recibido: number): void {
    let se_elimino = false;

    for (const clave in this.diccColisiones) {
      const indice = this.diccColisiones[clave].indexOf(valor_recibido);
      if (indice !== -1) {
        this.diccColisiones[clave].splice(indice, 1);
        se_elimino = true;
      }
    }

    for (const fila of this.tabla) {
      for (let col = 0; col < fila.length; col++) {
        if (fila[col] === valor_recibido) {
          fila[col] = null;
          se_elimino = true;
        }
      }
    }

    if (!se_elimino) {
      console.log(`\nLa clave ${valor_recibido} que desea eliminar no existe`);
    }

    if (
      (this.cantidadClaves() + this.contarNumColisiones()) /
        this.columnas <=
      1.05
    ) {
      if (this.columnas >= 4) {
        this.reduccion_total();
      }
    }
  }

  private reduccion_total(): void {
    this.columnas /= 2;
    const nueva_tabla: (number | null)[][] = Array.from(
      { length: this.filas },
      () => Array(this.columnas).fill(null)
    );

    for (let fila_indice = 0; fila_indice < this.filas; fila_indice++) {
      for (let col = 0; col < this.columnas * 2; col++) {
        const valor = this.tabla[fila_indice][col];
        if (valor !== null) {
          const new_indice = valor % this.columnas;
          const new_fila = this.filaVacia(new_indice, nueva_tabla);
          if (new_fila !== null) {
            nueva_tabla[new_fila][new_indice] = valor;
          } else {
            this.agregarColision(new_indice, valor);
          }
        }
      }
    }

    const aux_colisiones: number[] = [];

    for (const valor of Object.values(this.diccColisiones)) {
      for (const numero of valor) {
        const indice = numero % this.columnas;
        const fila = this.filaVacia(indice, nueva_tabla);
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
      this.agregarColision(new_indice, numero);
    }

    this.tabla = nueva_tabla;
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

  public getDatos(): void {
    if(this.formularioAgregar.valid){
      let valorIngresado = parseInt(this.formularioAgregar.value.dato, 10)
      this.insertar(valorIngresado);
      this.formularioAgregar.reset();
    }
  }

  public iniciarAccion(opcion: number): void{
    if(this.formularioBusqueda.valid){
      let valorIngresado = parseInt(this.formularioBusqueda.value.buscar, 10)
      if(opcion == 1){
        this.busquedaIniciada = true;
        this.buscar(valorIngresado);
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

  public contarNumColisiones() {
    let suma = 0;
    for (const valor of Object.values(this.diccColisiones)) {
      suma += valor.length;
    }
    return suma;
  }

  public cantidadClaves() {
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

  public convertirStringEnNumero(valor: string){
    return parseInt(valor);
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.construirFormularioBuscar();
  }

}
