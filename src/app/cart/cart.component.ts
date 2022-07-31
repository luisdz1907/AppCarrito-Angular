import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Producto } from '../models/producto';
import { Clientes } from '../models/cliente';
import { ClienteService } from '../clientes/cliente.service';
CartService
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cantidad!: number;
  suma!: number;
  product: Producto[] = this.cartService.getItems();
  cliente: Clientes[] = []
  constructor(private cartService: CartService, private clientesService: ClienteService ) {}

  ngOnInit() {
    this.sumCart()
    this.clientesService.getClientes()
          .subscribe(cliente =>{
            this.cliente = cliente
          })
  }



  Clearcart(){
    localStorage.removeItem("carrito");
    window.location.reload();
  }

  sumCart(){
    for (let i = 0; i < this.product.length; i++) {
      console.log(this.suma = this.product[i].precioVenta * this.product.length)
    }

    return this.suma;
  }

  deleteProduct(id: number){
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].id == id) {
        this.product.splice(i,1 )
        localStorage.setItem('carrito', JSON.stringify(this.product));
      }

    }
  }
}
