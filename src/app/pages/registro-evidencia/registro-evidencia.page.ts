import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OrdenModel } from 'src/app/models/orden/orden-model';
import { TipoEvidenciaModel } from 'src/app/models/tipoEvidencia/tipo-evidencia-model';
import { OrdenServiceService } from 'src/app/services/orden/orden-service.service';
import { TipoEvidenciaServiceService } from 'src/app/services/tipoEvidencia/tipo-evidencia-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file';
import { EvidenciaServiceService } from 'src/app/services/evidencia/evidencia-service.service';

@Component({
  selector: 'app-registro-evidencia',
  templateUrl: './registro-evidencia.page.html',
  styleUrls: ['./registro-evidencia.page.scss'],
})
export class RegistroEvidenciaPage implements OnInit {
  datosOrden: OrdenModel
  orden: string
  arrTipoEvidencia: TipoEvidenciaModel[]
  listaArchivo: dataFiles[]
  constructor(private ordenService: OrdenServiceService,
    private toastController: ToastController,
    private tipoEvidenciaService: TipoEvidenciaServiceService,
    private camera: Camera,
    private file: File,
    private evidenciaService: EvidenciaServiceService) { }

  ngOnInit() {
  }

  async buscarOrden() {
    var ListaOrden = await this.ordenService.obtenerOrden(this.orden).toPromise()
    if (ListaOrden.length > 0) {
      this.datosOrden = ListaOrden[0]
      var listaTipoEvidencia = await this.tipoEvidenciaService.obtenerTipoEvidencia().toPromise()
      if (listaTipoEvidencia.length > 0) {
        this.arrTipoEvidencia = listaTipoEvidencia
      } else {
        this.mostrarMensaje("No se han configurado Tipos")
      }
    } else {
      this.mostrarMensaje("no se encontró orden ingresada")
    }
  }

  async guardarDatos() {
    var evidencias = []
    for (var i = 0; i < this.listaArchivo.length; i++) {
      let ev = {
        "id": 0,
        "nombreArchivo": this.orden+'_'+this.listaArchivo[i].tipoEvidenciaId,
        "ubicacionArchivo": "C:\\Files\\",
        "tipoEvidenciaId": this.listaArchivo[i].tipoEvidenciaId,
        "usuarioRegistroId": 1,
        "activo": 1,
        "fechaRegistro": "2021-05-21",
        "ordenId": 1
      }
      evidencias.push(ev)
      var res  = await this.evidenciaService.guardarDatosEvidencias(evidencias).toPromise()
    }
    

    var response = await this.evidenciaService.guardarDatosEvidencias(evidencias).toPromise()
  }
  capturar(tipoId: number) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 1000,
      targetWidth: 1000,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.saveFile(file);
          this.listaArchivo.push({ tipoEvidenciaId: tipoId, ubicacion: imageData })
        });
      });
    }, (err) => {

    });
  }

  saveFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('file', imgBlob, file.name);
      this.evidenciaService.uploadFile(formData).subscribe(dataRes => {
        console.log(dataRes);
      });
    };
    reader.readAsArrayBuffer(file);
  }


  async mostrarMensaje(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

interface dataFiles {
  ubicacion: string;
  tipoEvidenciaId: number;
}
