import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';

const OUT_OF_RANGE: number = -1;
const CLAVE_EXISTE: string = "La clave a ingresar ya existe.";
const CLAVE_NO_EXISTE: string = "La clave buscada no existe.";

@Component({
  selector: 'app-busqueda-lineal-binaria',
  templateUrl: './busqueda-lineal-binaria.component.html',
  styleUrls: ['./busqueda-lineal-binaria.component.css']
})
export class BusquedaLinealBinariaComponent {
  public datos: number[] = [];
  public datosOrdenados: number[] = [];
  public formularioAgregar: FormGroup;
  public formularioBusqueda: FormGroup;
  public valorBuscado: number;
  public indexBuscadoOrdenado: number;
  public indexBuscadoOriginal: number;
  public estadoBusquedaBinaria: boolean = false;
  public inicioBusqueda: boolean = false;

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

  private busquedaSecuencial(arr: number[], num: number): number {
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
      if (!this.datos.includes(valorIngresado)){
        this.datos.push(valorIngresado);
        this.formularioAgregar.reset();
      }
      else {
        alert(CLAVE_EXISTE);
      }
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
        this.datosOrdenados = [...this.datos];
        this.indexBuscadoOrdenado = this.busquedaBinaria(this.datosOrdenados.sort((a, b) => a - b), this.valorBuscado);
        if (this.indexBuscadoOrdenado == OUT_OF_RANGE){
          alert(CLAVE_NO_EXISTE);
        }
      }
      this.formularioBusqueda.reset();
    }
  }

  get datoField() { return this.formularioAgregar.get('dato'); }
  get buscarField() { return this.formularioBusqueda.get('buscar'); }

  ngOnInit(): void {
    this.construirFormulario();
    this.construirFormularioBuscar();
  }
}
