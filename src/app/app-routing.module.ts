import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresarInstrumentoComponent } from './components/instrumentos/ingresar-instrumento/ingresar-instrumento.component';
import { LoginComponent } from './components/login/login.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { SalonesComponent } from './components/salones/salones.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ingresarInstrumento', component: IngresarInstrumentoComponent},
  {path: 'salones', component: SalonesComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'dashboard', component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
