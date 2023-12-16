import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoUsuario } from "src/app/core/models/enumtipousuario";


@Component({
  selector: 'app-paginainicial',
  templateUrl: './paginainicial.component.html',
  styleUrls: ['./paginainicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {

  constructor(private router: Router,) {

  }
  mostrarbotaoUsuarios: boolean = false;
  mostrarbotaoConsultas: boolean = false;

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser.tipo == TipoUsuario.ADMIN.value) {
      this.mostrarbotaoUsuarios = true;
      this.mostrarbotaoConsultas = false;
    } else if (storedUser.tipo == TipoUsuario.ATENDENTE.value) {
      this.mostrarbotaoUsuarios = true;
      this.mostrarbotaoConsultas = true;
    } else if (storedUser.tipo == TipoUsuario.PROFISSIONAL_SAUDE.value) {
      this.mostrarbotaoUsuarios = false;
      this.mostrarbotaoConsultas = true;
    } else {
      this.mostrarbotaoUsuarios = false;
      this.mostrarbotaoConsultas = true;
    }
  }

  irUsuarios() {
    this.router.navigate(['apps/usuarios']);
  }

  irConsultas() {
    this.router.navigate(['apps/consultas']);
  }
}