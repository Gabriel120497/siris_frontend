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
import { RolesComponent } from './components/admin/roles/roles.component';
import { ExternosComponent } from './components/externos/externos.component';
import CargaArchivosComponent from './components/admin/carga-archivos/carga-archivos.component';
import { TablaGruposComponent } from './components/tabla/tabla-grupos/tabla-grupos.component';
import { TablaInstrumentosComponent } from './components/tabla/tabla-instrumentos/tabla-instrumentos.component';
import { TablaEquiposComponent } from './components/tabla/tabla-equipos/tabla-equipos.component';
import { TablaSalonesComponent } from './components/tabla/tabla-salones/tabla-salones.component';
import { TablaAudicionesComponent } from './components/tabla/tabla-audiciones/tabla-audiciones.component';
import { TablaMisgruposComponent } from './components/tabla/tabla-misgrupos/tabla-misgrupos.component';
import { TablaReservasComponent } from './components/tabla/tabla-reservas/tabla-reservas.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'users/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'users/reservas/:modulo', component: ReservasComponent},
  {path: 'Grupos-de-Proyeccion/:role', component: GruposProyeccionComponent},
  {path: 'admin/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'admin/agregar/Roles', component: RolesComponent},
  {path: 'admin/Carga-Archivos', component: CargaArchivosComponent},
  {path: 'admin/Reservas', component: TablaReservasComponent},
  {path: 'admin/reservas/:modulo', component: ReservasComponent},
  {path: 'admin/Grupos-de-Proyeccion', component: TablaGruposComponent},
  {path: 'admin/Instrumentos', component: TablaInstrumentosComponent},
  {path: 'admin/Equipos', component: TablaEquiposComponent},
  {path: 'admin/Salones', component: TablaSalonesComponent},
  {path: 'admin/agregar/Instrumentos', component: InstrumentosComponent},
  {path: 'admin/agregar/Equipos', component: EquiposComponent},
  {path: 'admin/agregar/Salones', component: SalonesComponent},
  {path: 'admin/agregar/Grupos-de-Proyeccion', component: CursosGruposComponent},
  {path: 'teachers/Mis-Grupos', component: TablaMisgruposComponent},  
  {path: 'teachers/Audiciones', component: TablaAudicionesComponent},
  {path: 'teachers/NuevaAudicion', component: ExternosComponent},
  {path: 'teachers/:modulo', component: TablaComponent},
  {path: 'teachers/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'teachers/reservas/:modulo', component: ReservasComponent},
  {path: 'externos/Audicion/:grupo', component: ExternosComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'calendario', component: CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }