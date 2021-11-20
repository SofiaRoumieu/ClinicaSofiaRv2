import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTurnos'
})
export class SortTurnosPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    for (let index = 0; index < value.length; index++) {
      
      let element = value[index].numero;
      let siguiente = value[index+1].numero;
      let aux=0;

      if(element>siguiente)
      {
        aux = value[index];
        value[index] =  value[index+1];
        value[index+1] = value[index];
      }
      
    }
    
    return value;
  }

}