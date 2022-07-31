import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ClienteService } from './cliente.service';
import { Clientes } from '../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Clientes[] = [];
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((response) => {
      this.clientes = response;
      console.log(this.clientes);
    });
  }

  deleteCliente(cliente: Clientes) {
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
        text: `¿Estas seguro que deseas eliminar el cliente ${cliente.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((pro) => pro !== cliente);

            swalWithBootstrapButtons.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
}
