import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosListService {
  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  constructor(
    private http:HttpClient
  ) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(producto => producto as Producto[])
    );
  }
}
