import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasListComponent } from './consultas/list/consultas-list.component';
import { ConsultasEditComponent } from './consultas/edit/consultas-edit.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UsuariosListComponent } from './usuarios/list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios/edit/usuarios-edit.component';
import { ComponentsModule } from '../shared/components/components.module';
import { DatetimeComponent } from '../shared/components/datetime/datetime.component';
import { PaginaInicialComponent } from './paginainicial/paginainicial.component';

@NgModule({
  declarations: [
    ConsultasListComponent,
    ConsultasEditComponent,
    UsuariosListComponent,
    UsuariosEditComponent,
    DatetimeComponent,
    PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PagesRoutingModule,
    ComponentsModule,
    
  ],
  providers: [   
  ]
})
export class PagesModule { }
