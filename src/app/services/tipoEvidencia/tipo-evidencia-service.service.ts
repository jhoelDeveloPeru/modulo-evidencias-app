import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario/usuario-model';
import { TipoEvidenciaModel } from 'src/app/models/tipoEvidencia/tipo-evidencia-model';

@Injectable({
  providedIn: 'root'
})
export class TipoEvidenciaServiceService {
  endpoint = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {

   }

  obtenerTipoEvidencia(): Observable<TipoEvidenciaModel[]> {
    return this.httpClient.get<TipoEvidenciaModel[]>(this.endpoint + '/tipoevidencia',this.httpOptions)
      .pipe(
        tap(_ => console.log(`TipoEvidenciaModel`)),
        catchError(this.handleError<TipoEvidenciaModel[]>(`TipoEvidenciaModel`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
}
