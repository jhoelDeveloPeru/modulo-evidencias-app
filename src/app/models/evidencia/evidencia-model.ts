export interface EvidenciaModel {
     id:number;
     ordenId:number;
     nombreArchivo:string;
     ubicacionArchivo:string;
     tipoEvidenciaId:number;
     usuarioRegistroId:number;
     fechaRegistro:Date;
     activo:boolean;
}
