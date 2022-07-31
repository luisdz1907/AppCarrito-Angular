import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormProductoComponent } from './productos/form-producto/form-producto.component';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { FormCategoriaComponent } from './categorias/form-categoria/form-categoria.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente/form-cliente.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent},
  { path: 'categorias', component: CategoriasComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'cart', component: CartComponent},
  { path: 'lista-productos', component: ProductoListComponent},
  { path: 'productos/formulario-producto', component: FormProductoComponent},
  { path: 'productos/formulario-producto/:id', component: FormProductoComponent},
  { path: 'categorias/formulario-categoria', component: FormCategoriaComponent},
  { path: 'categorias/formulario-categoria/:id', component: FormCategoriaComponent},
  { path: 'clientes/formulario-cliente', component: FormClienteComponent},
  { path: 'clientes/formulario-cliente/:id', component: FormClienteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductosComponent,
    FormProductoComponent,
    CategoriasComponent,
    FormCategoriaComponent,
    ClientesComponent,
    FormClienteComponent,
    ProductoListComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
