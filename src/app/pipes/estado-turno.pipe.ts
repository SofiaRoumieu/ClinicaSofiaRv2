import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTurno'
})
export class EstadoTurnoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let retorno;
    //if(!value) retorno ='';
  
      if(value == 0)
      {
        retorno = "Pendiente";
      }
      else
      {
        if(value == -1)
        {
          retorno = "Cancelado por Paciente";
        }
        else
        {
          if(value == 1)
          {
            retorno = "Aceptado";
          }
          else
          {
            if(value == 2)
            {
              retorno = "Rechazado";
            }
            else
            {
              if(value == 3)
              {
                retorno = "En Atención";
              }
              else
              { 
                if(value == 4)
                {
                   retorno = "Cancelado por Profesional"; 
                }
                else{
                  if(value==-2){
                    retorno = "Cancelado por Administrador"; 
                  }
                  else
                  {
                    retorno = "Finalizado";

                  }
                }
              }
            }
          }
        }
      }

    
    return retorno;
  }

}
