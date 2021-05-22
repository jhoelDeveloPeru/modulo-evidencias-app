import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:string = ""
  clave:string = ""
  constructor(private router: Router,
    private usuarioService:UsuarioServiceService,
    private toastController:ToastController) { 
  }

  ngOnInit() {
  }

  async ingresar(){
    try {
      if(this.usuario == ""){
        this.mostrarMensaje("Ingrese un usuario")
        return
      }
      if(this.clave == ""){
        this.mostrarMensaje("Ingrese una clave")
        return
      }
      var usuario = await this.usuarioService.obtenerUsuario(this.usuario,this.clave).toPromise()
      if(usuario.length> 0){
        if(usuario[0].clave == this.clave){
          this.router.navigate(['registro-evidencia'])
        }else{
          this.mostrarMensaje("Clave incorrecta")
        }
      }else{
        this.mostrarMensaje("Usuario incorrecto")
      }
      
    } catch (error) {
      this.mostrarMensaje(error)
    }

  }
  
  async mostrarMensaje(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
