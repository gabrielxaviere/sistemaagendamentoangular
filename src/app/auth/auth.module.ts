
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { CadastroComponent } from '../auth/cadastro/cadastro.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,   
    // ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [   
  ]
})
export class AuthModule { }
