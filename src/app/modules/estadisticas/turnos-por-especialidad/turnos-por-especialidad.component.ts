import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { IChartistData, IPieChartOptions } from "chartist";
import { ChartEvent, ChartType } from "ng-chartist";
import { DataService } from "src/app/services/data.service";

////import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jspdf from "jspdf";


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.css']
})

export class TurnosPorEspecialidadComponent implements OnInit {
  labels=[]
  series=[];
  type: ChartType;
  data: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ:DataService) {
    this.dataServ.getTurnos().subscribe(res =>{
      let especialidadEncontrada=false;
      res.forEach(item =>{
        especialidadEncontrada=false;
        for(let i=0;i<this.labels.length;i++){
          if(this.labels[i]===item.especialidad){
            especialidadEncontrada=true;
            this.series[i]=Number(this.series[i]+1);
          }
        }
        if(especialidadEncontrada===false)
        {
          this.labels.push(item.especialidad);
          this.series.push(1);
        }
      });
      this.data = {
        labels: this.labels,
        "series": this.series
      };
    });

    this.type = 'Pie';
    
    this.options = {
      donut: false,
      showLabel: true,
      width:400,
      height:400
    };
  }

  ngOnInit(){
  }

  exportAsPDF(div_id: string){
    let data = document.getElementById(div_id);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('TurnosPorEspecialidad.pdf');   
    }); 
  }
}