import { Component } from '@angular/core';
import { FormBuilder ,FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';

@Component({
  selector: 'app-busqueda-transf-claves',
  templateUrl: './busqueda-transf-claves.component.html',
  styleUrls: ['./busqueda-transf-claves.component.css']
})
export class BusquedaTransfClavesComponent {
  public funcion :(input:number) =>number ;
  elementos: { [key: number]: any } = {};
  indice: number[] = [];
  tamArray:number = 1;
  colisiones: number = 0;
  ContadorCuadratico: number = 1;
  opcionColisionador: number = 0;
  element: boolean = false
  lista1: any[] = [];
  lista2: any[] = [];
  public formularioAgregar: FormGroup;
  dato: number = 0;
  agregarDato = new FormControl()
  ColisionadorListas: string =""
  numElementos = 0;
  buscarKeyOElemento: boolean = true
  buscarDato = new FormControl()
  Encontrado :number = 0
  existe: boolean = false;
  getDatos(){
  
  }
  

  buscar():void{
    let entrada = this.buscarDato.value;
    if(this.buscarKeyOElemento){
      this.Encontrado = this.elementos[entrada]
    }else{
      let keys  = Object.keys(this.elementos); // Obtener las claves como un arreglo
      let longitud = keys.length; // Obtener la longitud del arreglo de claves

      for (let i = 0; i < longitud; i++) {
        if (parseInt(this.elementos[parseInt(keys[i])]) === parseInt(entrada)){
          this.Encontrado = parseInt(keys[i])
          this.existe = true;
        }
      }
    }
    if (!this.existe){
      alert("El elemento no se encuentra en el arreglo.")
    }

  }
  toggleBuscarKeyOElemento() {
    this.buscarKeyOElemento = !this.buscarKeyOElemento;
  }

  agregar(): void {
    this.numElementos = this.numElementos +1 ;
    if (this.numElementos>this.tamArray){
      return
    }
    let input = parseInt(this.agregarDato.value);
    let indice = this.funcion(input);
    this.colisiones = 0;
    this.ContadorCuadratico = 0;
    console.log(this.elementos);
    // para la a tercera opcion del colisionador 
    if (this.opcionColisionador === 3) {
      if (this.elementos[indice] === undefined) {
        this.elementos[indice] = ""+input;
      } else {
        this.elementos[indice] =  this.elementos[indice] +","+input ;

      }
      for (const key in this.elementos) {
        if (this.elementos.hasOwnProperty(key)) {
          const value = this.elementos[key];
          if (Array.isArray(value)) {
            this.ColisionadorListas = value.join(", "); // Convierte la matriz en una cadena separada por comas
          }
        }
      }
      return;
    }
    //para saber que no esta ocupado
    while (this.elementos[indice] !== undefined) {
      this.colisiones += 1;
      indice = this.colisionador(indice);
      
    }
    if (indice > this.tamArray) {
      indice = indice % this.tamArray;
    }
    //para saber si el elemento ingresado ya esta o no en el array
    
    let esta = false;
    for (const clave in this.elementos) {
      if (this.elementos[clave] === input) {
        esta = true;
      }
    }
    if (esta) {
      console.log("El valor ya se encuentra registrado");
    } else {
      this.elementos[indice] = input;
      console.log(this.elementos);
    }
 
  }

  getKeys(object: { [key: number]: any }): number[] {
    return Object.keys(object).map(Number);
  }

  private construirFormulario(){
    
    this.formularioAgregar = new FormGroup({
      funcion: new FormControl("", [Validators.required]),
      tamano: new FormControl("", [Validators.required, isNumberPositiveValidator()]),
      solucionador: new FormControl("", [Validators.required]),
      DatoAGuardar: new FormControl("",[Validators.required])
    });
  }

  desplegar (){
    this.seleccionarFuncion(parseInt(this.formularioAgregar?.get("funcion")?.value));
    this.opcionColisionador = parseInt(this.formularioAgregar.get("solucionador")?.value);
    this.tamArray = this.formularioAgregar.get("tamano")?.value;
    return (this.element = !this.element);
      
  }

  obtener(): { [key: number]: any } {
    return this.elementos;
  }

  seleccionarFuncion(opcion : number) :void {
    switch (opcion){
      case 1:{
        this.funcion=this.mod;
        break
      }
      case 2:{
        this.funcion=this.cuadrado;
        break
      }
      case 3:{
        this.funcion=this.TruncamientoPar;
        break
      }
      case 4:{
        this.funcion=this.TruncamientoImpar;
        break
      }
      case 5:{
        this.funcion=this.plegamientoSuma;
        break
      }
      case 6:{
        this.funcion=this.plegamientoMultiplicacion;
        break
      }
      default: { 
        console.log("aiuda sufro")
        break; 
     } 
    }
  }
  
  public iniciarBusqueda(seleccion: number): void {
    if(this.formularioAgregar.valid){
      const valorfuncion = "";
      const valorFuncion = this.formularioAgregar.get('funcion')?.value;
      const tamArray = parseInt(this.formularioAgregar.value, 10);
      const valorColisionador = this.formularioAgregar.get("colisionador")?.value;
      const valorAGuardar = this.formularioAgregar.get("DatoAGuardar")?.value


      this.formularioAgregar.reset();
    }
  }

  colisionador(valor: number): number {
    switch (this.opcionColisionador) {
      case 1:
        return valor + 1;
      case 2:
        this.ContadorCuadratico += 1;
        const rta = valor + this.ContadorCuadratico ** 2;
        return rta;
      case 3:
        return valor;
      case 4:
        return (valor % this.tamArray) + 1;
      default:
        return valor+1;
    }
  }

  TruncamientoImpar(cadena: number): number {
    let valoresImpares = '';
    let cadenaString = cadena.toString();
    for (let i = 0; i < cadenaString.length; i++) {
      if (i % 2 === 0) {
        valoresImpares += cadenaString[i];
      }
    }
  
    return parseInt(valoresImpares)+1;
  }
  TruncamientoPar(cadena: number): number {
    let valoresPares = '';
    let cadenaString = cadena.toString();
    for (let i = 0; i < cadenaString.length; i++) {
      if (i % 2 === 1) {
        valoresPares += cadenaString[i];
      }
    }
  
    return parseInt(valoresPares)+1;
  }
  
  cuadrado(input: number): number {
    let rta = input;
    rta = rta ** 2;
    rta = this.encontrarCentro(rta);

    return rta+1;
  }

  plegamientoSuma(input: number, divisiones: number = 2): number {
    let inputStr = input.toString();
    if (inputStr.length % divisiones !== 0) {
      inputStr = inputStr.slice(0, -1);
    }
    const elementos: number[] = [];
    for (let i = 0; i < inputStr.length; i += divisiones) {
      elementos.push(parseInt(inputStr[i] + inputStr[i + 1]));
    }
    let rta = elementos.reduce((a, b) => a + b, 0);
    if (rta >= this.tamArray) {
      rta = this.plegamientoSuma(rta);
    }
    return rta+1;
  }

  plegamientoMultiplicacion(input: number, divisiones: number = 2): number {
    let inputStr = input.toString();
    if (inputStr.length % divisiones !== 0) {
      inputStr = inputStr.slice(0, -1);
    }
    const elementos: number[] = [];
    let resultado = 1;
    for (let i = 0; i < inputStr.length; i += divisiones) {
      elementos.push(parseInt(inputStr[i] + inputStr[i + 1]));
    }
    for (const i of elementos) {
      resultado *= i;
    }
    if (resultado >= this.tamArray) {
      resultado = this.plegamientoMultiplicacion(resultado);
    }
    return resultado+1;
  }

  mod(input: number, divisor: number = this.tamArray): number {
    return (input % divisor) + 1;
  }
  
  encontrarCentro(lista: number): number {
    const n = Math.log(this.tamArray) / Math.log(10);
    const listaString = lista.toString();
    const longitud = listaString.length;
    let instancia = 0;
    const inicio = Math.floor(longitud / 2) - n;
    instancia = parseInt(listaString.slice(inicio + 1, Math.floor(longitud / 2) + 1));
    return instancia;
  } 

  ngOnInit(): void {
    this.construirFormulario();
  }
}
