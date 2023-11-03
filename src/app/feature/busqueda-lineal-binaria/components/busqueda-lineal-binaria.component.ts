import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';
import { ModeloUsuario } from 'src/app/feature/modelo_usuario'

const OUT_OF_RANGE: number = -1;
const CLAVE_EXISTE: string = "La clave a ingresar ya existe.";
const CLAVE_NO_EXISTE: string = "La clave buscada no existe.";
const ESTRUCTURA_LLENA: string = "La estructura ya está llena.";
const VACIO: string = "None";
const SOBRE_RANGO_CIFRAS = "La cantidad de cifras no es igual a la digitó inicialmente: ";

@Component({
  selector: 'app-busqueda-lineal-binaria',
  templateUrl: './busqueda-lineal-binaria.component.html',
  styleUrls: ['./busqueda-lineal-binaria.component.css']
})
export class BusquedaLinealBinariaComponent {
  public datos: (number | string)[] = [];
  public datosOrdenados: (number | string)[] = [];
  public formularioTamano: FormGroup;
  public formularioAgregar: FormGroup;
  public formularioBusqueda: FormGroup;
  public valorBuscado: number;
  public indexBuscadoOrdenado: number;
  public indexBuscadoOriginal: number;
  public estadoBusquedaBinaria: boolean = false;
  public inicioBusqueda: boolean = false;
  public tamanoDefinido: boolean = false;
  public tamanoEstructura: number;
  public cifrasDatos: number;
  private habilitado: boolean = false;
  public nuevoDato: ModeloUsuario[] = [];

  constructor(){}

  private busquedaBinaria(arreglo: number[], elemento: number): number {
    console.log(arreglo);
    console.log(elemento);
    let inicio = 0;
    let fin = arreglo.length - 1;

    while (inicio <= fin) {
      const mitad = Math.floor((inicio + fin) / 2);
      if (arreglo[mitad] === elemento) {
        return mitad;
      } else if (arreglo[mitad] < elemento) {
        inicio = mitad + 1;
      } else {
        fin = mitad - 1;
      }
    }
    return OUT_OF_RANGE;
  }

  private busquedaSecuencial(arr: (number | string)[], num: number): number {
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

  private mostrarArregloOrdenado(){
    this.estadoBusquedaBinaria = true;
  }

  private ocultarArregloOrdenado(){
    this.estadoBusquedaBinaria = false;
  }

  private construirFormulario(){
    this.formularioAgregar = new FormGroup({
      dato: new FormControl("", [Validators.required, isNumberPositiveValidator()]),
      nombre: new FormControl("", [Validators.required])
    });
  }

  private construirFormularioTamano(){
    this.formularioTamano = new FormGroup({
      tamano: new FormControl({value: "", disabled: this.habilitado}, [Validators.required, isNumberPositiveValidator()]),
      cifras: new FormControl({value: "", disabled: this.habilitado}, [Validators.required, isNumberPositiveValidator()])
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
      let nombreUsuario = this.formularioAgregar.value.nombre;
      if (valorIngresado.toString().length == this.cifrasDatos){
        if (this.datos.length == 0){
          this.datos = new Array(this.tamanoEstructura).fill(VACIO);
        }
  
        if (this.datos.includes(VACIO)){
          if (!this.datos.includes(valorIngresado)){
            let numeroAgregado = false;
            for (let index = 0; index < this.datos.length; index++) {
              if (!numeroAgregado){
                if (this.datos[index] == VACIO){
                  this.datos[index] = valorIngresado;
                  this.nuevoDato[index] = {
                    id: valorIngresado,
                    info: nombreUsuario
                  }
                  numeroAgregado = true;
                }
              }
            }
            this.formularioAgregar.reset();
          }
          else {
            alert(CLAVE_EXISTE);
          }
        }
        else {
          alert(ESTRUCTURA_LLENA);
        }
      }
      else{
        alert(SOBRE_RANGO_CIFRAS + this.cifrasDatos);
      }
    }
    this.nuevoDato.forEach((usuario) => {
      console.log(`ID: ${usuario.id}, Info: ${usuario.info}`);
    });
  }

  public getTamano(): void {
    if(this.formularioTamano.valid){
      this.tamanoEstructura = parseInt(this.formularioTamano.value.tamano, 10)
      this.tamanoField?.disable();
      this.tamanoDefinido = true;
      this.cifrasDatos = parseInt(this.formularioTamano.value.cifras, 10)
      this.cifrasField?.disable();
      this.nuevoDato.length = this.tamanoEstructura;
    }
  }

  public iniciarBusqueda(seleccion: number): void {
    if(this.formularioBusqueda.valid){
      this.inicioBusqueda = true;
      this.valorBuscado = parseInt(this.formularioBusqueda.value.buscar, 10);
      this.indexBuscadoOriginal = this.busquedaSecuencial(this.datos, this.valorBuscado);

      if(seleccion == 1){
        this.ocultarArregloOrdenado();
      }

      if(seleccion == 2){
        this.mostrarArregloOrdenado();
        let arregloConDatos = this.obtenerDatosIngresados();
        this.indexBuscadoOrdenado = this.busquedaBinaria(arregloConDatos.sort((a, b) => a - b), this.valorBuscado);
        this.datosOrdenados = arregloConDatos.concat(this.arregloDeVacios(arregloConDatos.length));
        if (this.indexBuscadoOrdenado == OUT_OF_RANGE){
          alert(CLAVE_NO_EXISTE);
        }
      }
      this.formularioBusqueda.reset();
    }
  }

  private arregloDeVacios(tamano: number): number[]{
    let cantidadDatosVacios = this.tamanoEstructura - tamano;
    return new Array(cantidadDatosVacios).fill('None');
  }

  private obtenerDatosIngresados(): number[]{
    let arregloConDatos = [];
    for (let index = 0; index < this.datos.length; index++) {
      const dato = this.datos[index];
      if (typeof dato === 'number' && dato > 0){
        arregloConDatos.push(dato);
      }
    }
    return arregloConDatos
  }

  get datoField() { return this.formularioAgregar.get('dato'); }
  get nombreField() { return this.formularioAgregar.get('nombre'); }
  get buscarField() { return this.formularioBusqueda.get('buscar'); }
  get tamanoField() { return this.formularioTamano.get('tamano'); }
  get cifrasField() { return this.formularioTamano.get('cifras'); }

  ngOnInit(): void {
    this.construirFormulario();
    this.construirFormularioBuscar();
    this.construirFormularioTamano();
  }
}
