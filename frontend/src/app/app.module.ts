import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { CoreModule } from './core/core.module';
import { HeroComponent } from './components/share/hero/hero.component';
import { InicioSesionComponent } from './components/pages/inicio-sesion/inicio-sesion.component';
import { ReservasActivasGuiaComponent } from './components/share/reservas-activas-guia/reservas-activas-guia.component';
import { ReservasAntiguasGuiasComponent } from './components/share/reservas-antiguas-guias/reservas-antiguas-guias.component';
import { PasarelaPagoComponent } from './components/pages/pasarela-pago/pasarela-pago.component';
import { InformacionPerfilComponent } from './components/pages/informacion-perfil/informacion-perfil.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { ReservasComponent } from './components/pages/reservas/reservas.component';
import { ConfiguracionGuiaComponent } from './components/share/configuracion-guia/configuracion-guia.component';
import { ConfiguracionTuristaComponent } from './components/share/configuracion-turista/configuracion-turista.component';
import { InformacionAdicionalGuiaComponent } from './components/share/informacion-adicional-guia/informacion-adicional-guia.component';
import { PagoReservaComponent } from './components/share/pago-reserva/pago-reserva.component';
import { PagoAumentoVisibilidadComponent } from './components/share/pago-aumento-visibilidad/pago-aumento-visibilidad.component';
import { PasosComponent } from './components/share/pasos/pasos.component';
import { ResumenReservasComponent } from './components/share/resumen-reservas/resumen-reservas.component';
import { ResenasTuristaComponent } from './components/share/resenas-turista/resenas-turista.component';
import { BuscarGuiasComponent } from './components/pages/buscar-guias/buscar-guias.component';
import { ReservasRecientesComponent } from './components/share/reservas-recientes/reservas-recientes.component';
import { ReservasAntiguasTuristaComponent } from './components/share/reservas-antiguas-turista/reservas-antiguas-turista.component';
import { FiltrarGuiasComponent } from './components/share/filtrar-guias/filtrar-guias.component';
import { TarjetasGuiasComponent } from './components/share/tarjetas-guias/tarjetas-guias.component';
import { ConfiguracionPerfilComponent } from './components/pages/configuracion-perfil/configuracion-perfil.component';
import { ResenasGuiaComponent } from './components/share/resenas-guia/resenas-guia.component';
import { ReservasActivasTuristaComponent } from './components/share/reservas-activas-turista/reservas-activas-turista.component';
import { InfoGuiaComponent } from './components/share/info-guia/info-guia.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SkeletonComponent,
        InicioComponent,
        HeroComponent,
        InicioSesionComponent,
        ReservasActivasGuiaComponent,
        ReservasAntiguasGuiasComponent,
        PasarelaPagoComponent,
        InformacionPerfilComponent,
        RegistroComponent,
        ReservasComponent,
        ConfiguracionGuiaComponent,
        ConfiguracionTuristaComponent,
        InformacionAdicionalGuiaComponent,
        PagoReservaComponent,
        PagoAumentoVisibilidadComponent,
        PasosComponent,
        ResumenReservasComponent,
        ResenasTuristaComponent,
        BuscarGuiasComponent,
        ReservasRecientesComponent, 
        ReservasAntiguasTuristaComponent,
        FiltrarGuiasComponent,
        TarjetasGuiasComponent,
        ConfiguracionPerfilComponent,
        ResenasGuiaComponent,
        ReservasActivasTuristaComponent,
        InfoGuiaComponent,
    ],
    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ]
})
export class AppModule { }
