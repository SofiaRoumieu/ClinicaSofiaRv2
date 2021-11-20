import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-ver-turno-detalle',
  templateUrl: './ver-turno-detalle.component.html',
  styleUrls: ['./ver-turno-detalle.component.css']
})
export class VerTurnoDetalleComponent implements OnInit {
  
  @Input() mostrar:boolean;
  @Input() turno:Turno; 
  @Input() user:Usuario;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  @Output() eventoMostrarEncuesta = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  
    console.log("rol del usuario");
    console.log(this.user.rol);
    console.log("turno")
    console.info(this.turno);
  }
 
  cerrar() 
  { 
    
    this.eventoMostrarModal.emit(false);
  }

  encusesta()
  { 
    this.eventoMostrarModal.emit(false);

    this.eventoMostrarEncuesta.emit(true);
  }

}
