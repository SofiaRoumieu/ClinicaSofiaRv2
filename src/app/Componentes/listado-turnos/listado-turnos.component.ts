import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  listado:Array<Turno> = new Array<Turno> ();
  usuario:any = new Usuario();
  filtro = ['Profesional','Especialidad','Dia','Temperatura','Paciente','Adicionales','SinFiltro'];
  dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  fitroSeleccionado:string;
  escribir:string;
  adicional:string;
  dia:string;
  listaDinamicos:Array<any>;
  turnoSeleccionado:Turno;
  mostrarModal:boolean;
  mostrarModalDetalle:boolean;
  cancelarPro:boolean;
  rechazarPro:boolean;
  verResenia:boolean;

  constructor( private data:DataService,private auth:AuthService) { }

  ngOnInit(): void {
    var uid="0";
     this.auth.getUserUid().then(res =>{
       uid = res.toString();
       this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
            if(this.usuario.rol == "paciente")
            {
              this.data.getTurnos().subscribe(res =>{
              this.listado = res.filter(res => res.paciente.uid == this.usuario.uid && res.estado != -1);
              })
            }
            else
            {
              if(this.usuario.rol == "profesional")
              {
                this.data.getTurnos().subscribe(tur =>{
                  this.listado = tur.filter(res => res.profesional.uid == this.usuario.uid);
                })
              }
              else
              {
                this.data.getTurnos().subscribe(res =>{
                  this.listado = res
                })
              }
            }
          })
     }).catch(res =>{
      uid = res.toString();
     });
  } 

  mostrarEncuesta(dato:boolean)
  {
    this.mostrarModal = dato;
  }

  tomarTurno(turno:Turno)
  {
    this.turnoSeleccionado = turno;
    this.mostrarModalDetalle = true;
  }

  cerrarModalDetalle(dato:any)
  { 
    this.mostrarModalDetalle = dato;
  }

  cancelar(turno:Turno)
  {   
    this.turnoSeleccionado = turno;
    this.cancelarPro = true;
    this.mostrarModal = true;
  }

  verReseniaModal(turno:Turno){
    this.turnoSeleccionado = turno;
    this.verResenia = true;
    this.mostrarModal = true;
  }

  rechazar(turno:Turno)
  {
    this.rechazarPro = true;
    this.mostrarModal = true;//this.mostrarEncuesta(true);
  }
  aceptar(turno:Turno)
  {  
    this.auth.updateEstadoTurno(turno,1).then(res=>{
      //this.toast.success("Turno Aceptado con éxito");
    }).catch(error=>{
      //this.toast.error("Hemos tenido un problema la cancelar el turno","Error");
    })
    this.turnoSeleccionado = undefined;
  }

  justificacion(value:boolean)
  {
    this.rechazarPro = value;
    this.cancelarPro = value;
    this.verResenia=value;
  }

}
