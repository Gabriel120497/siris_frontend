import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { GruposProyeccionComponent } from './components/users/grupos-proyeccion/grupos-proyeccion.component';
import { ReservaEquiposComponent } from './components/users/reservas/reserva-equipos/reserva-equipos.component';
import { ReservasComponent } from './components/users/reservas/reservas.component';
import { ReservasAdminComponent } from './components/admin/reservas-admin/reservas-admin.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { InstrumentosComponent } from './components/admin/instrumentos/instrumentos.component';
import { EquiposComponent } from './components/admin/equipos/equipos.component';
import { SalonesComponent } from './components/admin/salones/salones.component';
import { CursosGruposComponent } from './components/admin/cursosGrupos/cursos-grupos.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'users/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'users/reservas/:tipoReserva', component: ReservasComponent},
  {path: 'Grupos-de-Proyeccion/:role', component: GruposProyeccionComponent},
  {path: 'admin/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'admin/:modulo', component: TablaComponent},
  {path: 'admin/agregar/Instrumentos', component: InstrumentosComponent},
  {path: 'admin/agregar/Equipos', component: EquiposComponent},
  {path: 'admin/agregar/Salones', component: SalonesComponent},
  {path: 'admin/agregar/Grupos-de-Proyeccion', component: CursosGruposComponent},
  {path: 'admin/reservas/:modulo', component: ReservasAdminComponent},
  {path: 'teachers/:modulo', component: TablaComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'calendario', component: CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }