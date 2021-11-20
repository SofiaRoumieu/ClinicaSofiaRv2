import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresosComponent } from './ingresos/ingresos.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
import { TurnosPorDiaComponent } from './turnos-por-dia/turnos-por-dia.component';
import { TurnosMedicoSolicitadosComponent } from './turnos-medico-solicitados/turnos-medico-solicitados.component';
import { TurnosMedicoFinalizadosComponent } from './turnos-medico-finalizados/turnos-medico-finalizados.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'ingresos', component: IngresosComponent},
      {path: 'turnosPorEspecialidad', component: TurnosPorEspecialidadComponent},
      {path: 'turnosPorDia', component: TurnosPorDiaComponent},
      {path: 'turnosFinalizadosMedico', component: TurnosMedicoFinalizadosComponent},
      {path: 'tuernosSolicitadosMedico', component: TurnosMedicoSolicitadosComponent},
      {path:'**', component: EstadisticasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
