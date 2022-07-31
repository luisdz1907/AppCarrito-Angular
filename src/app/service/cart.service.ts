import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 carrito: Producto[] = []
 precio!: any;
 cantidad!: any;

  constructor() { }



  comprobarCarrito(){
    let comprobarCarrito = JSON.parse(localStorage.getItem('carrito')!)

    if (comprobarCarrito == null) {
      this.precio = 0;
      this.cantidad = 0;
    }
  }


  addToCart(producto: Producto){

    if (JSON.parse(localStorage.getItem('carrito')!) == null) {
      this.carrito.push(producto);
      localStorage.setItem('carrito',JSON.stringify(this.carrito));
      localStorage.setItem('carrito',JSON.stringify(this.carrito));
    }else{
      this.carrito = JSON.parse(localStorage.getItem('carrito')!);
      this.carrito.push(producto);
      localStorage.setItem('carrito',JSON.stringify(this.carrito));
    }

  }


  getItems(){
    return JSON.parse(localStorage.getItem('carrito')!);
  }

}
