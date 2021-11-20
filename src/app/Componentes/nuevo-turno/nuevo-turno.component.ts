import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/clases/usuario';
import { Turno} from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {
  
  mostrarEspecialidades:boolean;
  mostrarFechas:boolean;
  mostrarHoras:boolean;
  mostrarProfesionales:boolean;
  mostrarPacientes:Boolean;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  horaFormGroup: FormGroup;
  turno:Turno = new Turno();
  profesionales:any;
  pacientes:any;
  especialidades:any;
  today = new Date();
  horas:Array<any> = [];
  usuario:any = new Usuario();
  hora:any;
  turnos:any = new Array<Turno>();
  diasAtencion:Array<any>=new Array<any>();
  diasDisponibles:Array<any>=new Array<any>();
  turnosDisponibles:Array<any> = new Array<any>();

  constructor(private route: Router, private _formBuilder: FormBuilder, private data: DataService, private auth: AuthService) {}

  ngOnInit() {
    this.mostrarProfesionales=true;
    this.mostrarEspecialidades=false;
    this.mostrarFechas=false;
    this.mostrarHoras=false;
    this.turnosDisponibles = [];

    this.turnos =this.data.getTurnos();
    this.cargarProfesionales();
    this.cargarPacientes();
    var uid="0";
    this.auth.getUserUid().then(res =>{
      uid = res.toString();
      this.data.getUserByUid(uid).subscribe(res => {
        this.usuario = res;
        console.log(this.usuario.rol);
        if(this.usuario.rol=='admin'){
          this.mostrarPacientes=true;
          this.mostrarProfesionales=false;
        }
      })
    }).catch(res =>{
     uid = res.toString();
     console.log("Sin Usuario");
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.horaFormGroup = this._formBuilder.group({
      horaCtrl: ['', Validators.required],
      fechaCtrl:['', Validators.required]
    });
  
  }

  cargarProfesionales()
  { 
    this.data.getProfesionales().then(res =>{
      if(res.length > 0)
      { 
        this.profesionales = res.filter(user => user.estado=='0'); 
      }
    });
  }

  cargarPacientes()
  { 
    this.data.getPacientes().then(res =>{
      if(res.length > 0)
      { 
        this.pacientes = res; 
      }
    });
  }

  tomarProfesional(dato:any)
  {
    this.mostrarProfesionales=false;
    this.especialidades=[];
    this.turno.profesional = dato;
    if(dato.especialidades.length>1){
      this.cargarEspecialidades(dato.especialidades);
      this.mostrarEspecialidades=true;
    }
    else{
      this.turno.especialidad=dato.especialidades[0];
      this.mostrarEspecialidades=false;
      this.mostrarFechas=true;
      this.CargarDiasDisponibles();
    }
    
  }

  tomarPaciente(dato:any)
  {
    this.mostrarPacientes=false
    this.mostrarProfesionales=true;
    this.turno.paciente = dato;
  }

  cargarEspecialidades(especialidadesProfesional:any){
    this.especialidades=new Array<any>();
    especialidadesProfesional.forEach(element => {
      this.data.getEspecialidadesByNombre(element, this.especialidades).then(res =>{
      });
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    let valid:boolean;

    this.turno.profesional.atencion.forEach(res =>{
       if(this.transformFech(res.dia) == day)
       {
          valid = true;
       }
    })

    return valid && day !== 0;
  }

  
  get nombre() {​​ return this.firstFormGroup.get('firstCtrl'); }
  
  
  tomarEspecialidad(dato:any)
  { 
    const {​​ nombre }​​ = this.firstFormGroup.value;
    
    this.turno.especialidad = dato.nombre;
    this.mostrarEspecialidades=false;
    this.mostrarFechas=true;
    this.CargarDiasDisponibles();
    this.turnosDisponibles.forEach(element => {console.log("recorriendo los turnos"); console.log(element)});
    //if(this.turnosDisponibles.length>0)
      this.EvaluarDiasDisponibles();
  }

  EvaluarDiasDisponibles(){
    console.log("dentro de evaluardisponibles!!");
    /*for (let i = 0; i < this.turnosDisponibles.length; i++) {
      console.log("dentro del for")
      //for (let i = 0; i < this.turnos.length; i++) {
        console.log(this.turnosDisponibles[i]['fecha']);
        console.log(this.turnosDisponibles[i]);
        this.diasAtencion.push(this.turnosDisponibles[i]['fecha']);
      //}
    }*/


   /* turnos.forEach(t=>{
      console.log("elemento del array::");
      console.log(t);
      if(this.diasAtencion.length==0)
        this.diasAtencion.push(t['fecha']);
      
    });*/
    //console.log("holaaa"+this.diasAtencion);
  }

  parserFecha(fecha:Date)
  {
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let anio = fecha.getFullYear() ;
    let feche;
    if(dia>9)
    {
      feche = anio + "-" + mes + "-" + dia;
    }
    else
    {
      feche = anio + "-" + mes + "-" + "0"+dia;
    }
      return feche;
  }

  transformFech(fecha:string)
  {  
    let dia;
    switch(fecha)
    {
        case "Lunes":
           dia = 1;
        break;
        case "Martes":
         dia = 2; 
        break;
        case "Miércoles":
          dia = 3; 
        break;
        case "Jueves":
          dia = 4; 
        break;
        case "Viernes":
          dia = 5; 
        break;
        case "Sábado":
          dia = 6; 
        break;
    } 
    return dia;
  }  

  tomarFecha(evento:any)
  { 
    this.turno.fecha = evento.fecha;
    this.mostrarFechas=false;
    this.mostrarHoras=true;
    this.cargarHora();
  }

  tomarHora(evento:any){
    this.turno.hora = evento;
    this.Entrar();
  }

  /*ExisteTurno(fecha:string,hora:any,num:number,dia:string,mes:number)
  { 
    console.log("numero::"+num);
     let turnosDisponibles = [];
     this.data.TurnoFecha(fecha,hora).then(res =>{
        turnosDisponibles = res;
        if(turnosDisponibles.length == 0)
        { 
          this.turnosDisponibles.push({fecha:fecha,hora:hora,numero:num,nombre:dia,mes:mes+1});
        }   
      })

      if(turnosDisponibles.length==0)
      {
        console.log("no hay turnos tomados");
      }
      else{
        if(turnosDisponibles.length==1){
          this.mostrarFechas=false;
          this.mostrarHoras=true;
        }
        else{
          this.mostrarFechas=true;
        }
      }
  }
*/
  ExisteTurno(fecha:string,hora:any,num:number,dia:string,mes:number)
  { 
     let turnosDisponibles = [];
     let encontrado:boolean=false;

     this.data.TurnoFecha(fecha,hora).then(res =>{
        turnosDisponibles = res;
        if(turnosDisponibles.length == 0)
        { 
          this.turnosDisponibles.forEach(t => {
              if(fecha==t.fecha)
                encontrado=true;
          });
          if(encontrado==false)
            {
              this.turnosDisponibles.push({fecha:fecha,hora:hora,numero:num,nombre:dia,mes:mes+1});
            }
        }   
      })
      if(turnosDisponibles.length==0)
      {
        console.log("no hay turnos tomados");
      }
      else{
       
        if(turnosDisponibles.length==1){
          this.mostrarFechas=false;
          this.mostrarHoras=true;
        }
        else{
          this.mostrarFechas=true;
        }
      }
  }


  OrdenarLista()
  {
    for (let index = 0; index < this.turnosDisponibles.length; index++) {
      
      let element = this.turnosDisponibles[index].numero;
      let siguiente = this.turnosDisponibles[index+1].numero;
      let aux=0;
  
      if(element>siguiente)
      {
        aux = this.turnosDisponibles[index];
        this.turnosDisponibles[index] =  this.turnosDisponibles[index+1];
        this.turnosDisponibles[index+1] = this.turnosDisponibles[index];
      }
    }
  }

  CargarDiasDisponibles()
  {
    let day = new Date();
    let diasDisponibles = [];

    this.turno.profesional.atencion.forEach(element => {
    let dia = this.transformFech(element.dia);
    let dif = day.getDay() - dia;
    let fecha:Date = new Date();

    if(dif > 0)
    { 
      fecha.setDate(fecha.getDate() - dif);
    }
    else
    {  
      if(dif<0)
      {
        fecha.setDate(fecha.getDate() - dif);
      }
      else
      {
      }
    }
    if(dif <1)
    {
      let fe  = this.parserFecha(fecha);
      this.ExisteTurno(fe,element.hora,fecha.getDate(),element.dia,fecha.getMonth());
    }

    let semana:Date = fecha;
    for (let i = 1; i < 3; i++) {
      let segundos=7*86399.9;
      semana.setSeconds(segundos);
      let sem = this.parserFecha(semana);
      this.ExisteTurno(sem,element.hora,this.transformFech(element.dia),element.dia,semana.getMonth());
    }
  });
}


  cargarHora()
  {
    
    this.horas = [];
    let horasAux=[];
    let turnosTomadosAux=[];
    let encontrado=false;
    let date = new Date(this.turno.fecha);
    
    date.setSeconds(86399.9);
    
    let dia="";
    let dias=[];
    switch(date.getDay())
    {
      case 1:
        dia = "Lunes";
        break;
      case 2:
         dia = "Martes";
        break;
      case 3:
        dia = "Miércoles";

        break;
      case 4:
        dia = "Jueves";
        
        break;
      case 5:
        dia = "Viernes";

        break;
      case 6:
        dia = "Sábado";
        
        break;
      case 6:
        dia = "Domingo";

        break;
    }
    dias = this.turno.profesional.atencion.filter(function(x){return x.dia == dia})
    if(dias.length>0)
    {
      //obtengo las horas de las atenciones
      horasAux = dias.map(function(x){return x.hora});
      
      //obtengo los turnos agendados del dia elegido y el profesional elegido
      this.data.getTurnosPorFechaYPorProfesional(this.turno.profesional.uid, this.turno.fecha.toString()).then(async res =>{
        
        if(res.length > 0)
        {
          turnosTomadosAux=res;
        }
        

        horasAux.forEach(h => {
          turnosTomadosAux.forEach(t => {
            if(t.hora==h){
              encontrado=true;
            }
          });
          if(encontrado==false){
            this.horas.push(h);
          }
        });
      });
      
    }
    else
    {
    }
  }
     
  Entrar(){  
    if(this.usuario.rol=='paciente')
      this.turno.paciente = this.usuario;
      
    this.data.getTurnosPorEstadoPorPacientePorFechaYHora(this.turno.paciente.uid, this.turno.fecha.toString(), this.turno.hora.toString()).then(async res =>{
      if(res.length > 0)
      {
        Swal.fire({
          title:'Error al registrar el turno',
          text:'El paciente ya tiene un turno tomado ese dia y a esa hora.',
          icon:'error',
          confirmButtonText:'Cerrar'
        });
      }
      else{
        this.auth.registerTurnos(this.turno).then(res=>{
      
          Swal.fire({
            title:'Registro de turno exitoso',
            text:'El turno fue registrado satisfactoriamente',
            icon:'success',
            confirmButtonText:'Cerrar'
          });
          this.route.navigate(['home']);
        }).catch(error =>{
          Swal.fire({
            title:'Error al registrar el turno',
            text:'Error: '+ error,
            icon:'error',
            confirmButtonText:'Cerrar'
          });
          console.info(error);
          this.route.navigate(['home']);
        })
      }
      
    });
  }
}
