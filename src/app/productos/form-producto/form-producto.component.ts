import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css'],
})
export class FormProductoComponent implements OnInit {
  public producto: Producto = new Producto();
  categoria: Categoria[] = [];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((categoria) => (this.categoria = categoria));

    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }
  create() {
    this.productoService.createProducto(this.producto).subscribe((producto) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto ' + producto.nombre + ' fue guardado con exito.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/productos']);
    });
  }
}
