import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../clases/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate, state} from '@angular/animations';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {PdfMakeWrapper, Txt, Img,Table} from 'pdfmake-wrapper';
import { DataService } from 'src/app/services/data.service';

pdfMake.vfs=pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css'],
  animations: [
    trigger('enterState', [
     state('void', style({
       transform: 'translateX(100%)',
       opacity:0
     })), 
     transition(':enter',[
       animate(2000, style({
        transform:'translateX(0)',
         opacity:1
       }))
     ])
    ])
    ]
})
export class BienvenidoComponent implements OnInit {

  usuario:Usuario;
  tipoUsuario: string;
  seleccionado:boolean;
  tipoAccion:string;
  profesionalesDelPaciente:any;
  
  constructor(private router: Router,
    private authService: AuthService,
    private dataService:DataService) { }

 
  ngOnInit(): void {
    this.seleccionado=false;
    this.authService.getUserByMail(this.authService.getCurrentUserMail()).then(res =>{
      if(res.length > 0)
      { 
        this.usuario=res[0];
        this.tipoUsuario=res[0].rol;
        if(this.usuario.rol=='paciente'){
          this.dataService.getProfesionalesByPacientes(this.usuario.uid,5).then(res =>{
            if(res.length > 0)
            { 
              this.profesionalesDelPaciente=res;
            }
        });
        }
      }
    }, error=>{
      Swal.fire({
      title:'Error',
      text:'Error al consultar usuario logueado: '+error,
      icon:'error',
      confirmButtonText:'Cerrar'
    });
    });
  }

  MostrarComponente(componente:string)
  {
    switch(componente){
      case 'administracionUsuario':
        this.router.navigate(['/administracionUsuarios']);  
        break;
      case 'nuevoTurno':
        this.router.navigate(['/nuevoTurno']);
        break;
      case 'misTurnos':
        this.router.navigate(['/listadoTurnos']);
      break;
      case 'horarios':
        this.router.navigate(['/horariosProfesional']);
      break;
      case 'consultarAgenda':
        this.router.navigate(['/listadoTurnos']);
        break;
        case 'misPacientes':
        this.router.navigate(['/administracionUsuarios']);
        break;
        case 'historiaClinica':
          this.router.navigate(['/historiaClinica']);
          break;
    }
  }

  VerEstadisticas(){
    this.router.navigate(['/estadisticas']);  
  }

  async VerHistoriaClinica(tipoHistoria:string){
    let hoy=new Date();
    let fecha= hoy.getDate()+"/"+ Number(hoy.getMonth()+1)+"/"+hoy.getFullYear();

    if(tipoHistoria=='todos'){
      this.dataService.getTurnosPorEstadoYPorPaciente(this.usuario.uid,5).then(async res =>{
        const miPdf= new PdfMakeWrapper();
        miPdf.add( await new Img('../../../assets/icono.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Historia clínica de '+ this.usuario.nombre + " " + this.usuario.apellido+" en Clínica SR").bold().fontSize(15).alignment("center").margin(15).end);
        miPdf.add( new Txt('Fecha de emisión: ' + fecha).margin(20).alignment("center").end);
        
        if(res.length > 0)
        {
          res.forEach(element => {
            miPdf.add( new Txt('Turno: ').margin(10).bold().end);
            miPdf.add(new Table([
              [ new Txt('Profecional: ').bold().end, element.profesional.nombre + " "+ element.profesional.apellido],
              [ new Txt('Especialidad: ').bold().end, element.especialidad],
              [ new Txt('Fecha de atención: ').bold().end, element.fecha],
              [ new Txt('Hora de atención: ').bold().end, element.hora],
              [ new Txt('Diagnóstico e indicaciones ').bold().end,''],
              [ new Txt('Comentarios: ').bold().end, element.opinionProfesional],
              [ new Txt('Presión Arterial: ').bold().end, element.presion],
              [ new Txt('Temperatura: ').bold().end, element.temperatura],
              [ new Txt('Altura: ').bold().end, element.altura],
              [ new Txt('Peso: ').bold().end, element.peso],
              //[ new Txt('Otras métricas').bold().end, ''],
              //[ new Txt(element.datosAdicionales[0].propiedad).bold().end, element.datosAdicionales[0].valor],
              //[ new Txt(element.datosAdicionales[1].propiedad).bold().end, element.datosAdicionales[1].valor],
              //[ new Txt(element.datosAdicionales[2].propiedad).bold().end, element.datosAdicionales[2].valor],
              ]).layout('noBorders').widths([ 200, 200 ]).margin(10).end
          );
          });

          miPdf.create().open();
          //miPdf.create().download();
        }
        else{
          miPdf.add( new Txt('El usuario no cuenta con historia clínica. Para esto es necesario haberse atendido al menos una vez con alguno de los profesionales' ).margin(30).end);
          miPdf.create().open();
          //miPdf.create().download();
        }
      });
    }
    else{
      this.dataService.getTurnosPorEstadoYPorPacienteYPorProfesional(this.usuario.uid,5,tipoHistoria).then(async res =>{
        const miPdf= new PdfMakeWrapper();
        miPdf.add( await new Img('../../../assets/icono.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Historia clínica de '+ this.usuario.nombre + " " + this.usuario.apellido+" en Clínica SR").bold().fontSize(15).alignment("center").margin(15).end);
        miPdf.add( new Txt('Fecha de emisión: ' + fecha).margin(20).alignment("center").end);
        
        
       if(res.length > 0)
        {
          res.forEach(element => {
            miPdf.add( new Txt('Turno: ').margin(10).bold().end);
            miPdf.add(new Table([
              [ new Txt('Profecional: ').bold().end, element.profesional.nombre + " "+ element.profesional.apellido],
              [ new Txt('Especialidad: ').bold().end, element.especialidad],
              [ new Txt('Fecha de atención: ').bold().end, element.fecha],
              [ new Txt('Hora de atención: ').bold().end, element.hora],
              [ new Txt('Diagnóstico e indicaciones ').bold().end,''],
              [ new Txt('Comentarios: ').bold().end, element.opinionProfesional],
              [ new Txt('Presión Arterial: ').bold().end, element.presion],
              [ new Txt('Temperatura: ').bold().end, element.temperatura],
              [ new Txt('Altura: ').bold().end, element.altura],
              [ new Txt('Peso: ').bold().end, element.peso],
              //[ new Txt('Otras métricas').bold().end, ''],
              //[ new Txt(element.datosAdicionales[0].propiedad).bold().end, element.datosAdicionales[0].valor],
              //[ new Txt(element.datosAdicionales[1].propiedad).bold().end, element.datosAdicionales[1].valor],
              //[ new Txt(element.datosAdicionales[2].propiedad).bold().end, element.datosAdicionales[2].valor],
              ]).layout('noBorders').widths([ 200, 200 ]).margin(10).end
          );
          });

          miPdf.create().open();
          //miPdf.create().download();
        }
        else{
          miPdf.add( new Txt('El usuario no cuenta con historia clínica. Para esto es necesario haberse atendido al menos una vez con alguno de los profesionales' ).margin(30).end);
          miPdf.create().open();
          //miPdf.create().download();
        }
      });
    }
  }
}
