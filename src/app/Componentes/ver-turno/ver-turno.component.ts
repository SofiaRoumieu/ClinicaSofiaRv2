import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';
import { Dinamicos} from 'src/app/clases/dinamicos';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-turno',
  templateUrl: './ver-turno.component.html',
  styleUrls: ['./ver-turno.component.css']
})
export class VerTurnoComponent implements OnInit {


  opinion:string;
  calificaciones = [1,2,3,4,5];
  calif:number;
  edad:number;
  temperatura:number;
  presion:number;
  altura:number;
  peso:number;
  //listaDinamicos:Array<Dinamicos> = new  Array<Dinamicos>();
  listaDinamicos = [];



  @Input() turno:Turno;
  @Input() user:Usuario;
  @Input() mostrar:boolean;
  @Input() cancelar:boolean;
  @Input() verResenia:boolean;
  @Input() rechazar:boolean;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  @Output() eventoJustifacion = new EventEmitter<boolean>();


  
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.rechazar);
    console.log(this.cancelar);
  }
  cerrar()
  {
    this.eventoMostrarModal.emit(false);
    this.eventoJustifacion.emit(false);

  }
  Enviar()
  { 
    if(!this.cancelar && !this.rechazar)
    {
        if(this.user.rol == "paciente")
        {
          this.auth.updateOpinion(this.turno,this.user,this.turno.opinionPaciente,this.turno.calificacionPaciente).then(res=>{
            //this.toas.success("Encuesta Guardada con éxito");
            this.auth.updateEstadoTurno(this.turno,5);
            this.eventoMostrarModal.emit(false);
            this.eventoJustifacion.emit(false);
          }).catch(error=>{
            //this.toas.error("Se produjo un error al Guardar tu encuesta","Error");
          })
        }
        else
        {
          if(this.user.rol == "profesional")
          { 
           // console.info(this.listaDinamicos);
            this.auth.updateOpinion(this.turno,this.user,this.turno.opinionProfesional,this.turno.calificacionProfesional,this.edad,this.temperatura,this.presion,this.peso, this.altura,this.listaDinamicos).then(res=>{
              //this.toas.success("Encuesta Guardada con éxito");
              this.auth.updateEstadoTurno(this.turno,3);
              this.eventoMostrarModal.emit(false);
              this.eventoJustifacion.emit(false);

            }).catch(error=>{
              //this.toas.error("Se produjo un error al Guardar tu encuesta","Error");
            })
          }
        }

    }
    else
    {
      if(this.cancelar)
      {  
        let estado:number;
        if(this.user.rol == "profesional")
        { 
          estado=4;
        }
        else{
          if(this.user.rol == "admin")
          {
            estado=-2;
          }
          else{
            estado=-1;
          }
        }
        console.log(estado);
          this.auth.upadteJustificacion(this.turno,this.turno.comentario).then(res =>{
            //this.toas.success("Justificación Guardada con éxito");
            this.auth.updateEstadoTurno(this.turno,estado);
            this.eventoMostrarModal.emit(false);

          })
      }
      else
      {
         this.auth.upadteJustificacion(this.turno,this.turno.comentario).then(res =>{
          //this.toas.success("Justificación Guardada con éxito");
          this.auth.updateEstadoTurno(this.turno,2);
          this.eventoMostrarModal.emit(false);

        })
      }
    }
  }
  
  cargarDatos()
  {
    if(this.turno.opinionPaciente != undefined && this.turno.calificacionPaciente != undefined)
    {
       this.calif = this.turno.calificacionPaciente;
       this.opinion = this.turno.opinionPaciente;
  
    }

  }
  onAgregarDatos(){
    this.listaDinamicos.push({propiedad:"",valor:""});    
    
  }



}

