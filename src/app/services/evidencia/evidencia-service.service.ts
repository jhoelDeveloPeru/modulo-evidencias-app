import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OrdenModel } from 'src/app/models/orden/orden-model';
import { EvidenciaModel } from 'src/app/models/evidencia/evidencia-model';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaServiceService {
  endpoint = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient:HttpClient) { }

  uploadFile(formData:FormData): Observable<any> {

    return this.httpClient.post<any>(this.endpoint + '/evidencia/archivo',formData,this.httpOptions)
      .pipe(
        tap(_ => console.log(`uploadFile`)),
        catchError(this.handleError<any>(`uploadFile`))
      );
  }

  guardarDatosEvidencias(evidencias:EvidenciaModel[]): Observable<any> {
    return this.httpClient.post(this.endpoint + '/evidencia',JSON.stringify(evidencias),this.httpOptions)
      .pipe(
        tap(_ => console.log(`guardarDatosEvidencias`)),
        catchError(this.handleError<any>(`guardarDatosEvidencias`))
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
