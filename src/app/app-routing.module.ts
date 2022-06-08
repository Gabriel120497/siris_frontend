import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { GruposProyeccionComponent } from './components/users/grupos-proyeccion/grupos-proyeccion.component';
import { ReservaEquiposComponent } from './components/users/reservas/reserva-equipos/reserva-equipos.component';
import { ReservasComponent } from './components/users/reservas/reservas.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users/reservas/Equipos', component: ReservaEquiposComponent},
  {path: 'users/reservas/:tipoReserva', component: ReservasComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'users/gruposdeproyeccion', component: GruposProyeccionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
