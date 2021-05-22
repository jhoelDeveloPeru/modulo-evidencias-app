import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OrdenModel } from 'src/app/models/orden/orden-model';

@Injectable({
  providedIn: 'root'
})
export class OrdenServiceService {
  endpoint = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  obtenerOrden(orden:string): Observable<OrdenModel[]> {
    return this.httpClient.get<OrdenModel[]>(this.endpoint + '/orden/?ordenServicio='+orden,this.httpOptions)
      .pipe(
        tap(_ => console.log(`User fetched: ${orden}`)),
        catchError(this.handleError<OrdenModel[]>(`Get user id=${orden}`))
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
