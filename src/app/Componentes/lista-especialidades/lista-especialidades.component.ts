import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, transition, style, animate, state} from '@angular/animations';


@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css'],
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
export class ListaEspecialidadesComponent implements OnInit {

  col:string = "";
  dis:boolean = false;
  @Output() enventoEspecialidad = new EventEmitter<any>();

 
  constructor(private data:DataService) { }

  @Input() listado:any;
  
  ngOnInit(): void {
    
  }
  
  tomarEspecialidad(especialidad:any)
  {
    this.enventoEspecialidad.emit(especialidad);
  }
}
