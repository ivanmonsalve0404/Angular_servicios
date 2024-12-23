import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/contenedor/cabecera/cabecera.component';
import { InicioComponent } from './components/contenedor/inicio/inicio.component';
import { ErrorComponent } from './components/contenedor/error/error.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapaComponent } from './components/colombia/mapa/mapa.component';
import { SpinnerComponent } from './utilities/plantilla/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    InicioComponent,
    ErrorComponent,
    SpinnerComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
