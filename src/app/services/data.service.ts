import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Usuario } from '../clases/usuario';
import { firestore } from 'firebase';
import { Ingreso } from '../clases/ingreso';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  usuarios;
  dbUsersRef:AngularFirestoreCollection<any>;
  dbEspecialidadRef: AngularFirestoreCollection<any>;
  dbTurnosRef:AngularFirestoreCollection<any>;
  dbIngresosRef:AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) { 
    this.usuarios = db.collection("usuarios").snapshotChanges();
    this.dbUsersRef=this.db.collection("usuarios");
    this.dbEspecialidadRef = this.db.collection("especialidades");
    this.dbTurnosRef = this.db.collection("turnos");
    this.dbIngresosRef= this.db.collection("ingresos");
  }

  getEspecialidades() {
    return this.dbEspecialidadRef.valueChanges();
  }

  AgregarEspecialidad(especialidad){
    this.dbEspecialidadRef.add({...especialidad});
  }

  async getProfesionales(){
    let usrsRef = await this.dbUsersRef.ref.where("rol", "==", "profesional").get();
    let listado:Array<any> = new Array<any>();
    let profesionales = [];
    let aux = [];
    // return usrsRef;

     usrsRef.docs.map(function(x){
        listado.push(x.data());
    });

    return listado;
  }

  async getPacientes(){
    let usrsRef = await this.dbUsersRef.ref.where("rol", "==", "paciente").get();
    let listado:Array<any> = new Array<any>();

     usrsRef.docs.map(function(x){
        listado.push(x.data());
    });

    return listado;
  }

  async getEspecialidadesByNombre(especialidad:string, listado:Array<any>){
    let usrsRef = await this.dbEspecialidadRef.ref.where("nombre", "==", especialidad).get();
    
     usrsRef.docs.map(function(x){
        listado.push(x.data());
    });
    return listado;
  }

  async getProfesionalesByEspecialidad(especialidad:string)
  { 
    let usrsRef = await this.dbUsersRef.ref.where("rol", "==", "profesional").get();
    let listado:Array<any> = new Array<any>();
    let profesionales = [];
    let aux = [];
    // return usrsRef;

     usrsRef.docs.map(function(x){
        listado.push(x.data());
    });

    listado.forEach(element => {
        aux.push(element.especialidades)
        aux[listado.indexOf(element)].forEach(res => {

          if(res == especialidad)
          {
            profesionales.push(element);
          }
          
        });
    });

    return profesionales;
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }

  async TurnoFecha(fecha:string,hora:any)
  {
    let turnos = [];
    let turnosUfs =  await this.dbTurnosRef.ref.where("fecha", "==", fecha).where("hora","==",hora).get();
    //let turnosUfs =  await this.dbTurnosRef.ref.where("fecha", "==", fecha).get();
      
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    return turnos;
  }

  getTurnos(){
    return this.dbTurnosRef.valueChanges();
  }

  async getTurnosByEstadoYPeriodo(estado:number){
    

    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("estado","==",estado).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    console.log("turnos::");

    console.log(turnos);
    return turnos;
  }

  async getIngresos(){
    let ingresos = await this.dbIngresosRef.ref.get();
    
    let listado:Array<any> = new Array<any>();
    let aux:Array<any>=new Array<any>();
    let ingreso:Ingreso;

    ingresos.docs.map(function(x){
        aux.push(x.data());
    });
    let dia:Date;

    aux.forEach(element => {
      ingreso=new Ingreso();
      dia=new Date(element.fechaacceso.seconds * 1000);
      ingreso.email=element.email;
      ingreso.fecha = dia.getDate() + "/" + Number(dia.getMonth()+1) + "/" + dia.getFullYear();
      ingreso.hora= dia.getHours() + ":" + dia.getMinutes();
      listado.push(ingreso);
    });
    return listado;
  }

  async getTurnosPorEstadoYPorPaciente(uidPaciente:string, estado:number){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("paciente.uid", "==", uidPaciente).where("estado","==",estado).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    console.log("turnos::");

    console.log(turnos);
    return turnos;
  }

  async getTurnosPorEstadoYPorPacienteYPorProfesional(uidPaciente:string, estado:number,uidProfesional:string){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("paciente.uid", "==", uidPaciente).where("estado","==",estado).where("profesional.uid","==",uidProfesional).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    console.log("turnos::");

    console.log(turnos);
    return turnos;
  }

  async getTurnosPorEstadoPorPacientePorFechaYHora(uidPaciente:string, fecha: string, hora:string){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("paciente.uid", "==", uidPaciente).where("hora", "==", hora).where("fecha", "==", fecha).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    console.log("turnos::");

    console.log(turnos);
    return turnos;
  }

  async getTurnosPorPacienteYPorProfesional(uidPaciente:string, uidProfesional:string){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("paciente.uid", "==", uidPaciente).where("profesional.uid","==",uidProfesional).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    return turnos;
  }

  async getTurnosPorFechaYPorProfesional(uidProfesional:string, fecha:string){
    let turnos :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("profesional.uid","==",uidProfesional).where("fecha", "==", fecha).get();
     
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    return turnos;
  }

  async getProfesionalesByPacientes(uidPaciente:string, estado:number){
    let turnos :Array<any> = new Array<any>();
    let profesionales :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("paciente.uid", "==", uidPaciente).where("estado","==",estado).get();
    let encontrado=false;

    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    turnos.forEach(t => {
      profesionales.forEach(p => {
        if(p.uid==t.profesional.uid)
          encontrado=true;
      });
      if(encontrado==false)
      {
        profesionales.push(t.profesional);
      }
    });
    console.log("profesionales::");

    console.log(profesionales);
    return profesionales;
  }

  async getPacientesByProfesionales(uidProfesional:string, estado:number){
    let turnos :Array<any> = new Array<any>();
    let pacientes :Array<any> = new Array<any>();
    let turnosUfs =  await this.dbTurnosRef.ref.where("profesional.uid", "==", uidProfesional).where("estado","==",estado).get();
    let encontrado=false;

    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    turnos.forEach(t => {
      pacientes.forEach(p => {
        if(p.uid==t.paciente.uid)
          encontrado=true;
      });
      if(encontrado==false)
      {
        pacientes.push(t.paciente);
      }
    });
    return pacientes;
  }

}