import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calificacion'
})
export class CalificacionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
     
    let estrellas; 
     
    switch(value)
    {
      case 1:
                    
       estrellas = "★"
        break;

      case 2:
        estrellas = "★★";
        break;

      case 3:
        estrellas = "★★★";

        break;

      case 4:
        estrellas = "★★★★";

          break;

      case 5:
        estrellas = "★★★★★";

            break;
    }

    return estrellas;
  }

}
