import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'inicio', component: BienvenidoComponent, canActivate:[AuthGuard]},
  {path:'empresas', component: InicioComponent, canActivate:[AuthGuard]},
  {path: 'sucursales', component: SucursalesComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}
];
