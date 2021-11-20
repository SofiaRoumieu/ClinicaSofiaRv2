import { Usuario } from "./usuario";
import { CommonModule, Time } from '@angular/common';
import { NgModule } from "@angular/core";
@NgModule({
    declarations: [],
    imports: [
      CommonModule
    ]
  })
export class Turno{
  
    id:number;
    paciente:Usuario;
    profesional:Usuario;
    fecha:Date; 
    hora:Time;
    estado:number;
    comentario:string;
    especialidad:string;
    calificacionPaciente:number;
    opinionPaciente:string;
    opinionProfesional:string;
    calificacionProfesional:number;
   
    constructor(){
       this.estado=0;
       this.comentario = "";
    }
}