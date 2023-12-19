import { EspecialidadesService } from './../../../core/service/especialidades.service';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TipoUsuario } from 'src/app/core/models/enumtipousuario';
import { Especialidades } from 'src/app/core/models/especialidades';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { MessageService } from 'src/app/core/service/message.service';
import { UsuariosService } from 'src/app/core/service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent {
  meuFormulario: FormGroup;
  item: User;
  tipoUsuario = [];
  tipoUsuarioLogado: number = 0;
  especialidades: Especialidades[];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuariosEditComponent>,
    private service: UsuariosService,
    private messageService: MessageService,
    private authenticationService: AuthService,
    private especialidadesService: EspecialidadesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.especialidadesService.getAll().subscribe(res =>
      this.especialidades = res
    );
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    this.tipoUsuarioLogado = storedUser.tipo;

    if (this.tipoUsuarioLogado == TipoUsuario.ATENDENTE.value) {
      this.tipoUsuario = [
        { id: 1, nome: 'Profissional da Saúde' },
        { id: 2, nome: 'Paciente' }]
    } else if (this.tipoUsuarioLogado == TipoUsuario.ADMIN.value) {
      this.tipoUsuario = [{ id: 3, nome: 'Atendente' }]
    }
    else {
      this.tipoUsuario = []
    }

    this.item = this.data.item;
    if (this.item.id > 0) {
      this.service.getById(this.item.id).subscribe(res => {
        this.item = res;
        this.createForm();
      },
        err => {
          this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
        });
    } else {
      this.createForm();
    }
  }

  createForm() {
    this.meuFormulario = this.fb.group({
      nome: [this.item.nome, [Validators.required]],
      sobrenome: [this.item.sobrenome, [Validators.required]],
      email: [this.item.email, [Validators.required, Validators.email]],
      password: [this.item.senha, [Validators.required]],
      tipo: [this.item.tipo, [Validators.required]],
      idEspecialidade: [this.item.idEspecialidade],
    });
  }

  prepareItem(): User {
    const controls = this.meuFormulario.controls;

    this.item.nome = controls['nome'].value;
    this.item.sobrenome = controls['sobrenome'].value;
    this.item.email = controls['email'].value;
    this.item.senha = controls['password'].value;
    this.item.tipo = controls['tipo'].value;
    this.item.idEspecialidade = controls['idEspecialidade'].value;

    return this.item;
  }

  onSubmit() {
    if (this.meuFormulario.valid) {
      const editedItem = this.prepareItem();

      if (editedItem.id > 0) {
        this.update(editedItem);
      } else {
        this.create(editedItem);
      }
    } else {
      this.messageService.openWarningSnackBar('Formulário inválido. Corrija os erros.');
    }
  }

  create(item) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser.tipo == TipoUsuario.ADMIN.value) {
      item.responsavel = storedUser.id;
    } else {
      item.responsavel = storedUser.responsavel;
    }

    this.service.create(item).subscribe(res => {
      this.messageService.openSuccessSnackBar('Operação realizada com sucesso.');
      this.fecharModal();
    }, err => {
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    });
  }

  update(item) {
    this.service.update(item).subscribe(res => {
      this.messageService.openSuccessSnackBar('Operação realizada com sucesso.');
      this.fecharModal();
    }, err => {
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  updateValidators(tipo) {
    console.log(tipo);
    if (tipo == TipoUsuario.PROFISSIONAL_SAUDE.value) {
      this.meuFormulario.get('idEspecialidade').setValidators(Validators.required)
      this.meuFormulario.get('idEspecialidade').updateValueAndValidity();
    } else {
      this.meuFormulario.get('idEspecialidade').reset();
      this.meuFormulario.get('idEspecialidade').setValidators([]);
      this.meuFormulario.get('idEspecialidade').updateValueAndValidity();
    }
  }
}
