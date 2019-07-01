import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'peliculas',
    loadChildren: './peliculas/peliculas.module#PeliculasPageModule' 
  },
  { path: 'series',
    loadChildren: './series/series.module#SeriesPageModule' 
  },
  { path: 'quienes-somos',
    loadChildren: './quienes-somos/quienes-somos.module#QuienesSomosPageModule' 
  },
  { path: 'peliculas/accion',
    loadChildren: './peliculas/accion/accion.module#AccionPageModule'
  },
  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'peliculas/ciencia', loadChildren: './peliculas/ciencia/ciencia.module#CienciaPageModule' },
  { path: 'peliculas/comedia', loadChildren: './peliculas/comedia/comedia.module#ComediaPageModule' },
  { path: 'peliculas/terror', loadChildren: './peliculas/terror/terror.module#TerrorPageModule' },
  { path: 'series/accion', loadChildren: './series/accion/accion.module#AccionPageModule' },
  { path: 'series/ciencia', loadChildren: './series/ciencia/ciencia.module#CienciaPageModule' },
  { path: 'series/comedia', loadChildren: './series/comedia/comedia.module#ComediaPageModule' },
  { path: 'series/terror', loadChildren: './series/terror/terror.module#TerrorPageModule' },
  { path: 'ingresar', loadChildren: './ingresar/ingresar.module#IngresarPageModule' },
  { path: 'modificar', loadChildren: './modificar/modificar.module#ModificarPageModule' },
  { path: 'eliminar', loadChildren: './eliminar/eliminar.module#EliminarPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
