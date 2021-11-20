import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let fecha = value.split('-');
    let retorno = fecha[2] +"-"+fecha[1]+"-"+fecha[0] 
    return retorno;
  }

}
