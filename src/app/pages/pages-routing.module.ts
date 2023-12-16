import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasListComponent } from './consultas/list/consultas-list.component';
import { UsuariosListComponent } from './usuarios/list/usuarios-list.component';
import { PaginaInicialComponent } from './paginainicial/paginainicial.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent
  },
  {
    path: 'consultas',
    component: ConsultasListComponent
  },
  {
    path: 'usuarios',
    component: UsuariosListComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
