import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './components/users/reservas/reservas.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReservaEquiposComponent } from './components/users/reservas/reserva-equipos/reserva-equipos.component';
import { GruposProyeccionComponent } from './components/users/grupos-proyeccion/grupos-proyeccion.component';
import { InstrumentosComponent } from './components/admin/instrumentos/instrumentos.component';
import { SalonesComponent } from './components/admin/salones/salones.component';
import { EquiposComponent } from './components/admin/equipos/equipos.component';
import { ReservasAdminComponent } from './components/admin/reservas-admin/reservas-admin.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { CursosGruposComponent } from './components/admin/cursosGrupos/cursos-grupos.component';
import { AudicionesComponent } from './components/teachers/audiciones/audiciones.component';
import { MisGruposComponent } from './components/teachers/mis-grupos/mis-grupos.component';


@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    CalendarioComponent,
    ReservaEquiposComponent,
    GruposProyeccionComponent,
    InstrumentosComponent,
    SalonesComponent,
    EquiposComponent,
    CursosGruposComponent,
    ReservasAdminComponent,
    TablaComponent,
    AudicionesComponent,
    MisGruposComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
