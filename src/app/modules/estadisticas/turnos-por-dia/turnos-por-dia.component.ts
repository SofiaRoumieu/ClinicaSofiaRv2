import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { IChartistData, IPieChartOptions } from "chartist";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { ChartEvent, ChartType } from "ng-chartist";
import { DataService } from "src/app/services/data.service";


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.css']
})
export class TurnosPorDiaComponent implements OnInit {
  labels=[]
  series=[];
  type: ChartType;
  data: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ:DataService) {

  this.dataServ.getTurnos().subscribe(res =>{
    let fechaEncontrada=false;
    res.forEach(item =>{
      fechaEncontrada=false;
      for(let i=0;i<this.labels.length;i++){
        if(this.labels[i]===item.fecha){
          fechaEncontrada=true;
          this.series[i]=Number(this.series[i]+1);
        }
      }
      if(fechaEncontrada===false)
      {
        this.labels.push(item.fecha);
        this.series.push(1);
      }

      
      //this.labels.push(item.nombre); 
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

exportAsPDF(div_id: string){
  let data = document.getElementById(div_id);  
  html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    pdf.save('TurnosPorDias.pdf');   
  }); 
}

  ngOnInit(){
    
  }
}