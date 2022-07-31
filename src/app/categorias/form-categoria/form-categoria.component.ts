import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
    public categoria: Categoria = new Categoria();
  constructor(
    private router:Router,
    private activeRouter: ActivatedRoute,
    private categoriaService:CategoriaService
  ) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(){
    this.activeRouter.params.subscribe(params =>{
      let id = params['id'];
      if (id) {
        this.categoriaService.getCategoria(id).subscribe(categoria =>{
          this.categoria = categoria
        })
      }
    })
  }

  createCategoria(){
    this.categoriaService.craeteCategoria(this.categoria).subscribe(categoria =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La Categoria ' + categoria.nombre + ' fue guardado con exito.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/categorias']);
    })
  }
}

