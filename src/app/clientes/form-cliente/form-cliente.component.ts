import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Clientes } from '../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent {
  public cliente:Clientes = new Clientes();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }


  cargarCliente(): void {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }
  create() {
    this.clienteService.createCliente(this.cliente).subscribe((cliente) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El Cliente ' + cliente.nombre + ' fue guardado con exito.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/clientes']);
    });
  }
}
