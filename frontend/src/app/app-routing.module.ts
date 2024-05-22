import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { InicioSesionComponent } from './components/pages/inicio-sesion/inicio-sesion.component';
import { ConfiguracionPerfilComponent } from './components/pages/configuracion-perfil/configuracion-perfil.component';
import { InformacionPerfilComponent } from './components/pages/informacion-perfil/informacion-perfil.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { PasarelaPagoComponent } from './components/pages/pasarela-pago/pasarela-pago.component';
import { ReservasComponent } from './components/pages/reservas/reservas.component';
import { BuscarGuiasComponent } from './components/pages/buscar-guias/buscar-guias.component';

const routes: Routes = [
  {
    path:"",
    component: SkeletonComponent,
    children:[
      { path: "", redirectTo: "inicio", pathMatch: "full" },
      { path: "inicio", component: InicioComponent },
      { path: "buscar-guia", component: BuscarGuiasComponent },
      { path: "inicio-sesion-guia", component: InicioSesionComponent },
      { path: "registro-guia", component: RegistroComponent },
      { path: "inicio-sesion-turista", component: InicioSesionComponent },
      { path: "registro-turista", component: RegistroComponent },
      { path: "configuracion-perfil-turista", component: ConfiguracionPerfilComponent },
      { path: "configuracion-perfil-guia", component: ConfiguracionPerfilComponent },
      { path: "perfil-guia/:id", component: InformacionPerfilComponent },
      { path: "pago-reserva", component: PasarelaPagoComponent },
      { path: "pago-aumento-visibilidad", component: PasarelaPagoComponent },
      { path: "mis-viajes", component: ReservasComponent },
      { path: "resumen-reservas", component: ReservasComponent },
      { path: "admin", component: InicioSesionComponent },
      //Faltan url y componentes de admin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
