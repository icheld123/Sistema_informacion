import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Registro } from '../model/registro.model';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})
export class IndicesComponent {
  /**
  * bloques
  * indice_en_bloques
  * registros_bloques
  * niveles
  */


  public formularioAgregar: FormGroup;
  public registros:Registro[]=[];
  public indices:number[] = [];
  public idActual: number;
  public registros_totales:number = 1;
  public tam_registros:number;
  public tam_indices:number;
  public tam_bloques:number;
  public registros_por_bloque:number;
  public bloques_totales:number;
  public bloques_indices:number[][]= [[]];
  public bloque:Registro[]=[]
  public bloques:Registro[][] = [[]];
  public infoActual: string;
  public selectedOption: string;

  public setDatos(registros_totales:number,tam_registros:number,tam_indices:number,tam_bloques:number){
    this.registros_totales = registros_totales;
    this.tam_registros = tam_registros;
    this.tam_indices = tam_indices;
    this.tam_bloques = tam_bloques;
  }

  public crearRegistro(id: number,info: string) {
    //alert("se llamó la función crear Registro")
    let registro:Registro = {id: id,info: info};
    if(this.registros.length==this.registros_totales){
      console.log("Registros totales:"+this.registros_totales+"  Registros: "+this.registros.length)
      alert("Se llegó al limite de registros indicado")
    }else if(this.indices.includes(id)){
      alert("La clave ya está en los registros")
    }else{
    alert("Registro guardado");
    this.indices.push(registro.id);
    this.registros.push(registro);
    this.idActual = 0;
    this.infoActual = ""; 
    }
  }
  public getRegistros(){
    return this.registros;
  }
  public funcionSeleccionada(){
    switch(this.selectedOption){
      case "1":
        this.getIndicesPrimariosDensos()
        break
      case "2":
        this.getIndicesPrimariosNoDensos()
        break
      case "3":
        this.getIndicesSecundariosDensos()
        break
      case "4":
        this.getIndicesSecundariosNoDensos()
        break
      case "5":
        this.getMultinivelPrimarios
        break
      case "6":
        this.getMultinivelSecundarios
        break
      default:

    }
  }

  //creacion de formulario
  /**private construirFormulario(){
    this.formularioAgregar = new FormGroup({
      dato: new FormControl("",[Validators.required,])
    })
  }
  **/
 


  getIndicesPrimariosDensos(){
    //index= posisción de registro , indexInd = posisción de indice
    let index: number = -1;
    let indexInd:number =0;
    
    this.registros_por_bloque = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/this.registros_por_bloque;

    //Se llenan los bloques con los registros
    for(let i=0; i<this.bloques_totales; i++){
      let bloque_actual:Registro[]=[];
      this.bloques[i]=bloque_actual;
      for(let j=0; j<this.registros_por_bloque;j++){
        
        let reg = this.registros[index]
        bloque_actual.push(reg)
        index++;
      }
      this.bloques.push(bloque_actual)
    }
    //se llenan los bloques de indice
    for(let k=0;k<this.bloques_totales;k++){
      let bloque_actual:number[]=[]
      this.bloques_indices[k]=bloque_actual;
      for(let l=0;l<this.registros_por_bloque;l++){
        if(index == this.indices.length){
          break;
        }
        let ind= this.indices[l];
        bloque_actual.push(ind);
        indexInd++;
      }
      this.bloques_indices.push(bloque_actual);
    }

  }
  getIndicesPrimariosNoDensos(){

    let index:number = 0;
    let indexInd:number =0;
    this.registros_por_bloque = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/this.registros_por_bloque;
    let indice_en_bloques:number = this.tam_bloques/this.tam_indices;
    let num_bloques_indices:number =this.tam_bloques/indice_en_bloques;
    
    //se llenan bloques totales
    for(let i=0; i<this.bloques_totales; i++){
      let bloque_actual:Registro[]=[];
      this.bloques[i]=bloque_actual;
      for(let j=0; j<this.registros_por_bloque;j++){
        if(index==this.registros.length){
          break;
        }
        let reg = this.registros[index]
        bloque_actual.push(reg)
        index++;
      }
      this.bloques.push(bloque_actual)
    }
    //se llenan los bloques de indice 
    for(let k=0;k<num_bloques_indices;k++){
      let bloque_actual:number[]=[]
      this.bloques_indices[k]=bloque_actual;
      for(let l=0;l<indice_en_bloques;l++){
        let ind= this.indices[l];
        bloque_actual.push(ind);
        indexInd++;
      }
      this.bloques_indices.push(bloque_actual);
    }


  }
  getIndicesSecundariosDensos(){

    let index:number =0;

    
    this.registros_por_bloque = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/this.registros_totales;
    //let registros_indice = registros_totales;

    for(let i=0; i<this.bloques_totales; i++){
      let bloque_actual:Registro[]=[];
      this.bloques[i]=bloque_actual;
      for(let j=0; j<this.registros_por_bloque;j++){
        if(index==this.registros.length){
          break;
        }
        let reg = this.registros[index]
        bloque_actual.push(reg)
        index++;
      }
      this.bloques.push(bloque_actual)
    }
    //se llenan los indices con el id de cada registro
   ;
      for(let i=0;i<this.registros_totales;i++){
        let ind= this.registros[i].id;
        this.indices.push(ind);
      }
  }
  getIndicesSecundariosNoDensos(){

    let index=0;
    let indexInd=0;
    
    this.registros_por_bloque = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/this.registros_por_bloque;
    let indice_en_bloques:number = this.tam_bloques/this.tam_indices;
    let num_bloques_indices:number =this.registros_totales/indice_en_bloques;


//se llenan bloques totales
    for(let i=0; i<this.bloques_totales; i++){
      let bloque_actual:Registro[]=[];
      this.bloques[i]=bloque_actual;
      for(let j=0; j<this.registros_por_bloque;j++){
        if(index==this.registros.length){
          break;
        }
        let reg = this.registros[index]
        bloque_actual.push(reg)
        index++;
      }
      this.bloques.push(bloque_actual)
    }
    //se llenan los bloques de indice 
    for(let k=0;k<num_bloques_indices;k++){
      let bloque_actual:number[]=[]
      this.bloques_indices[k]=bloque_actual;
      for(let l=0;l<indice_en_bloques;l++){
        let ind= this.indices[l];
        bloque_actual.push(ind);
        indexInd++;
      }
      this.bloques_indices.push(bloque_actual);
    }
    
  }
  getMultinivelPrimarios(){
    let registros_bloque:number = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/registros_bloque;
    let indice_en_bloques:number = this.tam_bloques/this.tam_indices;
    let bloques_indices:number =this.bloques_totales/indice_en_bloques;

    let indices:number [][];
    let niveles = Math.log(this.bloques_totales)/Math.log(indice_en_bloques);
    let bloques_indices_nivel = bloques_indices/indice_en_bloques;
    let indices_nivel:number [];

  }
  getMultinivelSecundarios(){
    
    let registros_bloque:number = this.tam_bloques/this.tam_registros;
    this.bloques_totales = this.registros_totales/registros_bloque;
    let indice_en_bloques:number = this.tam_bloques/this.tam_indices;
    let bloques_indices:number =this.bloques_totales/indice_en_bloques;

    let niveles = Math.log(this.registros_totales)/Math.log(indice_en_bloques);

    let bloques_indices_nivel = bloques_indices/indice_en_bloques;

    let indices:number [][];
    let indices_nivel:number [];
  }
}
