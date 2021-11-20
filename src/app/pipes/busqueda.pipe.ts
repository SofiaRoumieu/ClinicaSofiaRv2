import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(value: any[], args: string): unknown {
    const result = [];
    if(args != undefined && args != "")
    {

      value.forEach(item =>{
        
        if(item.profesional.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          {
            result.push(item);

          }
        }
        if(item.profesional.apellido.toLowerCase().indexOf(args.toLowerCase()) > -1)
        { 
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.profesional.dni.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.profesional.email.toLowerCase().indexOf(args.toLowerCase()) > -1)
        { 
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.paciente.email.toLowerCase().indexOf(args.toLowerCase()) > -1)
        { 
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.paciente.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
        { 
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.paciente.apellido.toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.paciente.dni.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.presion!= undefined)
        {
          if(item.presion.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
          { 
            if(result.indexOf(item) == -1)
            result.push(item);
          }
          
        }
        if(item.temperatura!= undefined)
        {
          if(item.temperatura.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
          { 
            if(result.indexOf(item) == -1)
            result.push(item);
          }

        }
        if(item.edad!= undefined)
        {
          if(item.edad.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
          {
            if(result.indexOf(item) == -1)
            result.push(item);
          }

        }
        if(item.comentario!= undefined)
        {
          if(item.comentario.toLowerCase().indexOf(args.toLowerCase()) > -1)
          {
            if(result.indexOf(item) == -1)
            result.push(item);
          }

        }
        if(item.calificacionPaciente!= undefined)
        {
          if(item.calificacionPaciente.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
          {
            if(result.indexOf(item) == -1)
            result.push(item);
          }
          
        }
        if(item.calificacionProfesional!= undefined)
        {
          if(item.calificacionProfesional.toString().toLowerCase().indexOf(args.toLowerCase()) > -1)
          {
            if(result.indexOf(item) == -1)
            result.push(item);
          }
          
        }
        if(item.fecha.toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.especialidad.toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.hora.toLowerCase().indexOf(args.toLowerCase()) > -1)
        {
          if(result.indexOf(item) == -1)
          result.push(item);
        }
        if(item.datosAdicionales != undefined)
        {
          item.datosAdicionales.forEach(element => {
              
                 if(element.valor.toLowerCase().indexOf(args.toLowerCase()) > -1)
                    {   
                       if(result.indexOf(item) == -1)
                        result.push(item);

                    }
            
          
          });
        }
      
        
        
  
  
      })
    }
   
    if(result.length>0)
    {
      return result;

    }
    else
    {
      if(args == undefined || args == "")
      {

        return value;
      }

    }
  }

}
