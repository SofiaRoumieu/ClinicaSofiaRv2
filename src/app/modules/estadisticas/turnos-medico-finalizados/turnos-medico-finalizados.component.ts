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
  selector: 'app-turnos-medico-finalizados',
  templateUrl: './turnos-medico-finalizados.component.html',
  styleUrls: ['./turnos-medico-finalizados.component.css']
})
export class TurnosMedicoFinalizadosComponent implements OnInit {

  labels=[]
  series=[];
  type: ChartType;
  data: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ:DataService) {
    let hoy=new Date();
    let fechaHoy =  hoy.getFullYear() + '-' + Number(hoy.getMonth() + 1) + '-' +hoy.getDate();

    let elMesPasado = new Date(hoy.setDate(hoy.getDate()-30));
    let mesPasado= elMesPasado.getFullYear()  + '-' + Number(elMesPasado.getMonth() + 1) + '-' +  elMesPasado.getDate();
    
    this.dataServ.getTurnosByEstadoYPeriodo(5).then(async res =>{
      let profesionalEncontrada=false;
      
      res.forEach(item =>{
        
        if(item.fecha<=fechaHoy && item.fecha>=mesPasado){
          profesionalEncontrada=false;
          for(let i=0;i<this.labels.length;i++){
            if(this.labels[i]===item.profesional.apellido){
              profesionalEncontrada=true;
              this.series[i]=Number(this.series[i]+1);
            }
          }
          if(profesionalEncontrada===false)
          {
            this.labels.push(item.profesional.apellido);
            this.series.push(1);
          }
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

  exportAsPDF(div_id: string){
    let data = document.getElementById(div_id);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('TurnosFinalizadosPorProfesional.pdf');   
    }); 
  }

  ngOnInit(){
  }
}
