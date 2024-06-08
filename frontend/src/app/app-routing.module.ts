import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authGuardService/auth-guard.service';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { InicioSesionComponent } from './components/pages/inicio-sesion/inicio-sesion.component';
import { ConfiguracionPerfilComponent } from './components/pages/configuracion-perfil/configuracion-perfil.component';
import { InformacionPerfilComponent } from './components/pages/informacion-perfil/informacion-perfil.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { PasarelaPagoComponent } from './components/pages/pasarela-pago/pasarela-pago.component';
import { ReservasComponent } from './components/pages/reservas/reservas.component';
import { BuscarGuiasComponent } from './components/pages/buscar-guias/buscar-guias.component';
import { InicioSesionAdminComponent } from './components/pages/inicio-sesion-admin/inicio-sesion-admin.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    component: SkeletonComponent,
    children:[
      { 
        path: "inicio", 
        component: InicioComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public', 'guide', 'tourist'] } 
      },
      { 
        path: "buscar-guia", 
        component: BuscarGuiasComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public', 'tourist','guide'] } 
      },
      { 
        path: "inicio-sesion-guia", 
        component: InicioSesionComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public'] } 
      },
      { 
        path: "registro-guia", 
        component: RegistroComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public'] } 
      },
      { 
        path: "inicio-sesion-turista", 
        component: InicioSesionComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public'] } 
      },
      { 
        path: "registro-turista", 
        component: RegistroComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public'] } 
      },
      { 
        path: "configuracion-perfil-turista", 
        component: ConfiguracionPerfilComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['tourist'] } 
      },
      { 
        path: "configuracion-perfil-guia", 
        component: ConfiguracionPerfilComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['guide'] } 
      },
      { 
        path: "perfil-guia/:id", 
        component: InformacionPerfilComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public', 'tourist'] } 
      },
      { 
        path: "pago-reserva/:id/:price/:name/:startDate/:endDate/:hours", 
        component: PasarelaPagoComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['tourist', 'public'] } 
      },
      { 
        path: "mis-viajes", 
        component: ReservasComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['tourist'] } 
      },
      { 
        path: "resumen-reservas", 
        component: ReservasComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['guide'] } 
      },
      { 
        path: "admin", 
        component: InicioSesionAdminComponent, 
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['public', 'admin'] } 
      },
      { 
        path: "admin-dashboard", 
        component: DashboardComponent,
        canActivate: [AuthGuard], 
        data: { expectedRoles: ['admin'] } 
      },
      { 
        path: '**', 
        redirectTo: '/inicio' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
