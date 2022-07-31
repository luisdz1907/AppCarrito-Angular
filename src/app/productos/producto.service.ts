import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //URL del provedor de spring boot
  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  //Obtenemos los headers de la aplicacion
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(producto => producto as Producto[])
    );
  }

  getProducto(id: any): Observable<Producto>{
     return this.http.get<Producto>(`${this.urlEndPoint}/${id}`)
  }

  createProducto(producto: Producto): Observable<Producto>{
    return this.http
    .post(this.urlEndPoint, producto,{
      headers: this.httpHeaders,
    })
    .pipe(
      map((response: any) => response.producto as Producto),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }

        Swal.fire('Error al crear al producto',e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Producto>{
     return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders }).pipe(
      catchError(e =>{
        Swal.fire('Error al eliminar', e.error.error, 'error');
        return throwError(e);
      })
     )
  }
}
