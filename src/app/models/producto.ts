import { Categoria } from './categoria';
export class Producto{
  id! : number;
  nombre!: string;
  marca!: string;
  stock!: string;
  fechaRegistro!: Date;
  precioCompra!: number;
  precioVenta!: number;
  descripcion!: string;
  categoria!: Categoria[]
}
