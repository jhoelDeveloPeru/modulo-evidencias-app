import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEvidenciaPageRoutingModule } from './registro-evidencia-routing.module';

import { RegistroEvidenciaPage } from './registro-evidencia.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrdenServiceService } from 'src/app/services/orden/orden-service.service';
import { TipoEvidenciaServiceService } from 'src/app/services/tipoEvidencia/tipo-evidencia-service.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEvidenciaPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistroEvidenciaPage],
  providers:[HttpClient,OrdenServiceService,TipoEvidenciaServiceService]
})
export class RegistroEvidenciaPageModule {}
