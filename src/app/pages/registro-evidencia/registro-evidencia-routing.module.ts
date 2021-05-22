import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEvidenciaPage } from './registro-evidencia.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEvidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEvidenciaPageRoutingModule {}
