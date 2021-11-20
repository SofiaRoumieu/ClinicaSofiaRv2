import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-turnos-mis-pacientes',
  templateUrl: './turnos-mis-pacientes.component.html',
  styleUrls: ['./turnos-mis-pacientes.component.css']
})
export class TurnosMisPacientesComponent implements OnInit {

  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  @Input() user:Usuario;
  @Input() mostrar:boolean;
  @Input() paciente:Usuario;
  @Input() listado:any;
  
  verResenia:boolean;
  mostrarModal:boolean;
  mostrarModalDos:boolean;
  turnoSeleccionado:Turno=new Turno();
  constructor(private data:DataService) { }

  ngOnInit(): void {
    
  }

  cerrar()
  {
    this.eventoMostrarModal.emit(false);
  }
  verReseniaModal(turno:Turno){
    console.log("ver reseña modal"+ turno);
    //this.mostrarModal=false;
    this.turnoSeleccionado = turno;
    this.verResenia = true;
    this.mostrarModalDos = true;
    
  }

  cerrarComentario(){
    this.mostrarModalDos = false;
  }
  mostrarEncuesta(dato:boolean)
  {
    this.mostrarModal = dato;
  }

  justificacion(value:boolean)
  {
    this.verResenia=value;
  }

}
