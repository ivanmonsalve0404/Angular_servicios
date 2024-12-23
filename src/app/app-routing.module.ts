import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/contenedor/inicio/inicio.component';
import { ErrorComponent } from './components/contenedor/error/error.component';
import { MapaComponent } from './components/colombia/mapa/mapa.component';

const routes: Routes = [
  {
    path: 'home',
    component: InicioComponent,
  },
  /* rutas obligatorias */
  {
    path: 'colombia', children: [
      
      { path: 'map', component: MapaComponent },

      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: '*', component: ErrorComponent },
    ]

  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
