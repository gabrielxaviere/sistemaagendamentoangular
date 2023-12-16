import { User } from "./user";

export class Consultas {
  id: number;
  idPaciente: number;
  idProfissional: number;
  data: Date;
  status: number;

  clear() {
    this.id = 0;
    this.idPaciente = 0;
    this.idProfissional = 0;
    this.data = null;
    this.status = 0;
  }
}
