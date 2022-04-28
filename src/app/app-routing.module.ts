import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ReservasComponent } from './components/reservas/reservas.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reservas/:tipoReserva', component: ReservasComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'calendario', component: CalendarioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
