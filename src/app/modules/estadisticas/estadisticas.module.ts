import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
import { TurnosPorDiaComponent } from './turnos-por-dia/turnos-por-dia.component';
import { TurnosMedicoFinalizadosComponent } from './turnos-medico-finalizados/turnos-medico-finalizados.component';
import { TurnosMedicoSolicitadosComponent } from './turnos-medico-solicitados/turnos-medico-solicitados.component';
import { ChartistModule } from "ng-chartist";


@NgModule({
  declarations: [EstadisticasComponent, IngresosComponent, TurnosPorEspecialidadComponent, TurnosPorDiaComponent, TurnosMedicoFinalizadosComponent, TurnosMedicoSolicitadosComponent],
  imports: [
    ChartistModule,
    CommonModule,
    EstadisticasRoutingModule
  ]
})
export class EstadisticasModule { }
