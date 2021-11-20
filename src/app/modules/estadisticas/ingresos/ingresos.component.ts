import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Ingreso} from 'src/app/clases/ingreso';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  listado:any= new Array<any>();

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getIngresos().then(res =>{
      console.log(res);
      if(res.length > 0)
      { 
        this.listado = res; 
      }
    });
  }

  DescargarXLS(){
    //this.authService.TraerTodos().subscribe(res =>{
     // this.listaTurnos = res.filter(res => res.paciente.uid == paciente.uid );
      
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Listado de usuarios");
      let header=["E-Mail","Fecha","Hora"]
      let headerRow = worksheet.addRow(header);
      
      for (let x1 of this.listado)
      {
        let temp=[];
        let estado:string;
        temp.push(x1['email']);
        temp.push(x1['fecha']);
        temp.push(x1['hora']);
        worksheet.addRow(temp)
      }

      let fname="Log_de_Ingresos";

      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname+'.xlsx');
      });

    //})

  }
}
