import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from './producto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe((response) => {
      this.productos = response;
      console.log(this.productos);
    });
  }
  deleteProducto(producto: Producto) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: `¿Estas seguro que deseas eliminar el producto ${producto.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productoService.delete(producto.id).subscribe((response) => {
            this.productos = this.productos.filter((pro) => pro !== producto);

            swalWithBootstrapButtons.fire(
              'Producto Eliminado',
              `Producto ${producto.nombre} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getProductos();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProductos();
  }
}
