import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pais } from 'src/app/clases/pais';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss']
})
export class TablaPaisesComponent implements OnInit {
  @Output() seSeleccionoPais: EventEmitter<any> = new EventEmitter<any>();


  public listaPaises: Pais[] = []

  public bandera: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let name: string;
    let bandera: string;
    this.apiService.ObtenerPaises().subscribe((paises: any) => {
      for (let index = 0; index < paises.length; index++) {
        name = paises[index].name.common;
        bandera = paises[index].flags.png;
        this.listaPaises.push(new Pais(name, bandera))
      }
      this.listaPaises = this.shuffle(this.listaPaises).slice(0, 10);
    }
    )
  }

  SeleccionarPais(pais: Pais) {
    this.bandera = pais.bandera;
    this.seSeleccionoPais.emit(pais.nombre);
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}