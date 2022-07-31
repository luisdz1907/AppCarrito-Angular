import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria } from '../models/categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit{
  categorias: Categoria [] = [];
  constructor(
    private catgeoriaService :CategoriaService
  ) {}

  ngOnInit(): void{
    this.getCategorias();
  }

  getCategorias(): void{
    this.catgeoriaService.getCategorias()
          .subscribe( response =>{
            this.categorias = response;
          })
  }

  deleteCategoria(categoria: Categoria) {
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
        text: `¿Estas seguro que deseas eliminar la categoria ${categoria.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
            this.catgeoriaService.deleteCategoria(categoria.id).subscribe((response) => {
            this.categorias = this.categorias.filter((pro) => pro !== categoria);

            swalWithBootstrapButtons.fire(
              'Categoria ELiminada',
              `Categoria ${categoria.nombre} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
}

