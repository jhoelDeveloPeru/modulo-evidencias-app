import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  endpoint = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { 

  }

  obtenerUsuario(usuario:string,clave:string): Observable<UsuarioModel[]> {
    var credenciales = {
      "usuario":usuario,
      "clave":clave
    }
    return this.httpClient.post<UsuarioModel[]>(this.endpoint + '/usuario',JSON.stringify(credenciales),this.httpOptions)
      .pipe(
        tap(_ => console.log(`User fetched: ${usuario}`)),
        catchError(this.handleError<UsuarioModel[]>(`Get user id=${usuario}`))
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
