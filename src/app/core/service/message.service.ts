import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 3000, // duração em milissegundos
      panelClass: ['success-snackbar'], // classe de estilo personalizado
    });
  }

  openErrorSnackBar(message: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  openWarningSnackBar(message: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['warning-snackbar'],
    });
  }

  // Exemplos de uso
  // mostrarMensagemSucesso() {
  //   this.openSuccessSnackBar('Operação realizada com sucesso.');
  // }

  // mostrarMensagemErro() {
  //   this.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
  // }

  // mostrarMensagemAviso() {
  //   this.openWarningSnackBar('Aviso: Algo está acontecendo.');
  // }
  
}
