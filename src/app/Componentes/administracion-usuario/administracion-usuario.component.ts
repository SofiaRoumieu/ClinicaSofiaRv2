import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {PdfMakeWrapper, Txt, Img,Table} from 'pdfmake-wrapper';
import { Usuario } from 'src/app/clases/usuario';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-administracion-usuario',
  templateUrl: './administracion-usuario.component.html',
  styleUrls: ['./administracion-usuario.component.css']
})
export class AdministracionUsuarioComponent implements OnInit {

  //exportacion excel
  solapaAMostrar:string;
  usuario:Usuario;
  tipoUsuario: string;
  pacientesDelProfesional:any;
  mostrarModalTurnosMisPacientes:boolean;
  usuarioSeleccionado:Usuario;

  listaUsuarios=[];
  listadoTurnosMiPaciente:any;
  listaTurnos:Array<Turno>= new Array<Turno> ();

  pacientes;
  pacientesPag;

  profesionales;
  profesionalesPag;

  administradores;
  administradoresPag;

  constructor(private authService:AuthService,private router: Router, private dataService:DataService) {
    this.authService.TraerTodos().subscribe((res)=>{
      
      this.listaUsuarios = res;
      this.pacientes = this.listaUsuarios.filter(user => user.rol=='paciente');
      this.profesionales = this.listaUsuarios.filter(user => user.rol=='profesional');
      this.administradores= this.listaUsuarios.filter(user => user.rol=='admin');
    })
   }

  ngOnInit(): void {
    this.solapaAMostrar="admin";
    this.authService.getUserByMail(this.authService.getCurrentUserMail()).then(res =>{
      if(res.length > 0)
      { 
        this.usuario=res[0];
        this.tipoUsuario=res[0].rol;
        if(this.usuario.rol=='profesional'){
          this.solapaAMostrar="pacientes";
          this.dataService.getPacientesByProfesionales(this.usuario.uid,5).then(res =>{
            if(res.length > 0)
            { 
              this.pacientesDelProfesional=res;
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

  HabilitarProfesional(profesional){
    console.log(profesional);
    this.authService.HabilitarProfesional(profesional);
    profesional.estado=0;
  }

  DeshabilitarProfesional(profesional){
    console.log(profesional);
    this.authService.DeshabilitarProfesional(profesional);
    profesional.estado=1;
  }

  NuevoUsuario(){
    this.router.navigate(['/registro']);  
  }

  verTurnos(paciente:Usuario){
    this.dataService.getTurnosPorPacienteYPorProfesional(paciente.uid,this.usuario.uid).then(async res =>{
      
      console.log(res.length);
      
      if(res.length > 0)
      {
        this.listadoTurnosMiPaciente=res;
      }
    });
    console.log("turnos");
    console.log(this.listadoTurnosMiPaciente);
    this.usuarioSeleccionado=paciente;
    this.mostrarModalTurnosMisPacientes=true;
  }

  cerrarModalDetalle(dato:any)
  { 
    this.mostrarModalTurnosMisPacientes = dato;
  }

  descargarUsuarios(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Listado de usuarios");
    let header=["Nombre","Apellido","Edad", "DNI", "Rol", "Email"]
    let headerRow = worksheet.addRow(header);
    
    for (let x1 of this.listaUsuarios)
    {
      let temp=[];
      let estado:string;
      temp.push(x1['nombre']);
      temp.push(x1['apellido']);
      temp.push(x1['edad']);
      temp.push(x1['dni']);
      temp.push(x1['rol']);
      temp.push(x1['email']);
      worksheet.addRow(temp)
    }

    let fname="Usuarios";

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'.xlsx');
    });
  }

  VerTurnosAgendados(paciente:Usuario){
    this.dataService.getTurnos().subscribe(res =>{
      this.listaTurnos = res.filter(res => res.paciente.uid == paciente.uid );
      
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Turnos del usuario");
      let header=["Nombre Profesional","Apellido Profesional", "Especialidad", "Fecha", "Hora", "Estado del turno"]
      let headerRow = worksheet.addRow(header);
      
      for (let x1 of this.listaTurnos)
      {
        let temp=[];
        let estado:string;
        estado=this.BuscarEstado(x1['estado']);
        temp.push(x1['profesional']['nombre']);
        temp.push(x1['profesional']['apellido']);
        temp.push(x1['especialidad']);
        temp.push(x1['fecha']);
        temp.push(x1['hora']);
        temp.push(estado);
        worksheet.addRow(temp)
      }

      let fname="Turnos"+'-'+paciente.apellido+'_'+paciente.nombre;

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname+'.xlsx');
      });

    })
      
  }
  BuscarEstado(estado:number){
    let estadoString:string="";
    switch(estado){
      case -2:
        estadoString='Cancelado por administrador';
        break;
      case -1:
        estadoString='Cancelado por paciente'
        break;
      case 0:
        estadoString='Pendiente'
        break;
      case 1:
        estadoString='Aceptado'
        break;
      case 2:
        estadoString='Rechazado'
        break;
      case 3:
        estadoString='En atención'
        break;
      case 4:
        estadoString='Cancelado por profesional'
        break;
      case 5:
        estadoString='Finalizado'
        break;
    }
    return estadoString;
  }

  VerAtenciones(paciente:Usuario){
    let hoy=new Date();
    let fecha= hoy.getDate()+"/"+ Number(hoy.getMonth()+1)+"/"+hoy.getFullYear();

    
      this.dataService.getTurnosPorEstadoYPorPaciente(paciente.uid,5).then(async res =>{
        const miPdf= new PdfMakeWrapper();
        miPdf.add( await new Img('../../../assets/icono.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Historial clínica del '+ paciente.nombre + " " + paciente.apellido + " en Clínica SR").bold().fontSize(15).alignment("center").margin(15).end);
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