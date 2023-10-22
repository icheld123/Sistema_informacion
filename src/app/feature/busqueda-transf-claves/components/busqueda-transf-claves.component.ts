import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumberPositiveValidator } from 'src/app/shared/utils/validadores/form.validacion';

@Component({
  selector: 'app-busqueda-transf-claves',
  templateUrl: './busqueda-transf-claves.component.html',
  styleUrls: ['./busqueda-transf-claves.component.css']
})
export class BusquedaTransfClavesComponent {

  public formularioAgregar: FormGroup;

  getDatos(){

  }

  private construirFormulario(){
    this.formularioAgregar = new FormGroup({
      funcion: new FormControl("", [Validators.required]),
      tamano: new FormControl("", [Validators.required, isNumberPositiveValidator()]),
      solucionador: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }
}
