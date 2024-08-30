import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth/auth.guard';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'prefix'},
  {path:'login', component: LoginComponent},
  {path:'inicio', component: BienvenidoComponent, canActivate:[AuthGuard]},
  {path:'empresas', component: InicioComponent, canActivate:[AuthGuard]},
  {path: 'sucursales', component: SucursalesComponent, canActivate:[AuthGuard]}
];
