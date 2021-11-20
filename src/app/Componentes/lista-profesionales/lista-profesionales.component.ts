import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'app-lista-profesionales',
  templateUrl: './lista-profesionales.component.html',
  styleUrls: ['./lista-profesionales.component.css'],
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
export class ListaProfesionalesComponent implements OnInit {

  @Input() especialidad:string;
  @Input() listado:any;
  @Output() enventoProfesional = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
    
  }

  seleccionarProfesional(dato:any)
  {  
     this.enventoProfesional.emit(dato);
  }

}

