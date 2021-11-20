import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meses'
})
export class MesesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let retorno;

    switch(value)
    {
      case 1:
        retorno = "Enero";
        break;
      case 2:
        retorno = "Febrero";
        
        break;
      case 3:
        retorno = "Marzo";

        break;
      case 4:
        retorno = "Abril";

        break;
      case 5:
        retorno = "Mayo";

        break;
      case 6:
        retorno = "Junio";

        break;
      case 7:
        retorno = "Julio";

        break;
      case 8:
        retorno = "Agosto";

        break;
      case 9:
        retorno = "Septiembre";

        break;
      case 10:
        retorno = "Octubre";

        break;
      case 11:
        retorno = "Noviembre";

        break;
      case 12:
        retorno = "Diciembre";

        break;

    }

    return retorno;
  }

}
