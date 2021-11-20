import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.css']
})
export class HorariosProfesionalComponent implements OnInit {

  constructor(private auth:AuthService,private data:DataService) { }

  dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  horarios = [];
  dia:any;
  hora:any;
  profesional:any = new Usuario();
  displayedColumns: string[] = ['Nombre', 'Día', 'Hora','Acción'];

  ngOnInit(): void {
    var uid="0";
    this.auth.getUserUid().then(res =>{
      uid = res.toString();
      this.data.getUserByUid(uid)
         .subscribe(res => {
           this.profesional = res;
         })
    }).catch(res =>{
     uid = res.toString();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 ;
  }

  setHorarios(inicio:number,final:number)
  {
     this.horarios = [];
     for (let index = inicio; index < final; index++) {
       let time = index + ":" + "00";
       this.horarios.push(time);
    } 
  }

  sabado()
  {
    if(this.dia == "Sábado")
    {
      this.setHorarios(8,15);
    }
    else
    {
      this.setHorarios(8,20);
    }
  }

  atencion()
  { 
    let aux:Array<any> = new Array();
    let nuev:Array<any> = new Array();
    aux.push(this.profesional.atencion);
    aux.forEach(item =>{
      nuev.push(item);
    })
    nuev[0].push({dia:this.dia,hora:this.hora});
    
    this.profesional.atencion = nuev[0];

    this.auth.updateHorario(this.profesional).then(res =>{
      Swal.fire({
        title:'Horario cargado',
        text:'El horario de atención ha sido cargado exitosamente',
        icon:'success',
        confirmButtonText:'Cerrar'
      });
    }).catch(error =>{
      Swal.fire({
        title:'Error al cargar horario',
        text:'Error' + error,
        icon:'error',
        confirmButtonText:'Cerrar'
      });
    });
  }

  eliminar(item)
  { 
     let aux:Array<any> = new Array();
     let nuev:Array<any> = new Array();

     aux.push(this.profesional.atencion);
    
     aux[0].splice(aux[0].indexOf(item),1);
     
     this.profesional.atencion = aux[0];
     this.auth.updateHorario(this.profesional).then(res =>{
      Swal.fire({
        title:'Horario eliminado',
        text:'El horario de atención ha sido eliminado exitosamente, aquellos turnos que hubiesen sido tomados fueron cancelados.',
        icon:'success',
        confirmButtonText:'Cerrar'
      });
   }).catch(error =>{
    Swal.fire({
      title:'Error el eliminar horario',
      text:'Error' + error,
      icon:'error',
      confirmButtonText:'Cerrar'
    });
   });
  }
}
