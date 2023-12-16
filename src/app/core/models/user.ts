import { Especialidades } from "./especialidades";

export class User {
  id: number;
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  status: number;
  tipo: number;
  accessToken: string;
  idEspecialidade: number;
  responsavel:number;


  clear() {
    this.id = 0;
    this.email = '';
    this.senha = '';
    this.nome = '';
    this.sobrenome = '';
    this.status = 0;
    this.tipo = 0;
    this.accessToken = "";
    this.idEspecialidade = null;
    this.responsavel = 0;
  }
}
