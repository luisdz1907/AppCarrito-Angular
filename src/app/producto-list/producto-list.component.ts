import { Component, OnInit } from '@angular/core';
import { ProductosListService } from '../service/productos-list.service';
import { Producto } from '../models/producto';
import { CartService } from '../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductosListService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe((response) => {
      this.productos = response;
      console.log(this.productos);
    });
  }

  addToCard(producto: Producto) {
    this.cartService.addToCart(producto);
    window.alert('Producto Agregado Al Carrito');
  }
}
