import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Clientes } from '../models/cliente';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService{
  //URL del provedor de spring boot
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  //Obtenemos los headers de la aplicacion
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Clientes[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(cliente => cliente as Clientes[])
    );
  }

  getCliente(id: any): Observable<Clientes>{
     return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`)
  }

  createCliente(cliente: Clientes): Observable<Clientes>{
    return this.http
    .post(this.urlEndPoint, cliente,{
      headers: this.httpHeaders,
    })
    .pipe(
      map((response: any) => response.cliente as Clientes),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }

        Swal.fire('Error al crear al cliente', e.error.error ,'error');

        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders }).pipe(
     catchError(e =>{
       Swal.fire('Error al eliminar', e.error.error, 'error');
       return throwError(e);
     })
    )
 }
}

