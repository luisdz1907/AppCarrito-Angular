import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private urlEndPoint: string = 'http://localhost:8080/api/categorias';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }

  getCategoria(id: any): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`);
  }
  craeteCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post(this.urlEndPoint, categoria, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }

          Swal.fire('Error al crear la categoria.',e.error.error,'error');
          return throwError(e);
        })

      );
  }

  deleteCategoria(id: number): Observable<Categoria> {
    return this.http
      .delete<Categoria>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire('Error al eliminar', e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
