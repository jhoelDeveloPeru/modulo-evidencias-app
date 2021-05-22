import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers:[UsuarioServiceService,HttpClient]
})
export class LoginPageModule {}
