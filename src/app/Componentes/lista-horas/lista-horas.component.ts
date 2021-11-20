import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.component.html',
  styleUrls: ['./lista-horas.component.css'],
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
    ])]
})

export class ListaHorasComponent implements OnInit {

  @Input() especialidad:string;
  @Input() listado:any;
  @Output() enventoHorario = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  seleccionarHorario(dato:any)
  {  
     this.enventoHorario.emit(dato);
  }

}


