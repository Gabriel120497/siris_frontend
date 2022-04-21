import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentosComponent } from './components/instrumentos/instrumentos.component';
import { SalonesComponent } from './components/salones/salones.component';
import { IngresarInstrumentoComponent } from './components/instrumentos/ingresar-instrumento/ingresar-instrumento.component';
import { ListarInstrumentosComponent } from './components/instrumentos/listar-instrumentos/listar-instrumentos.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentosComponent,
    SalonesComponent,
    IngresarInstrumentoComponent,
    ListarInstrumentosComponent,
    ReservasComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
