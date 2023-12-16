import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Consultas } from 'src/app/core/models/consulta';
import { Especialidades } from 'src/app/core/models/especialidades';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConsultasService } from 'src/app/core/service/consultas.service';
import { EspecialidadesService } from 'src/app/core/service/especialidades.service';
import { MessageService } from 'src/app/core/service/message.service';
import { UsuariosService } from 'src/app/core/service/usuarios.service';
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas-edit.component.html',
  styleUrls: ['./consultas-edit.component.scss'],
})
export class ConsultasEditComponent {
  meuFormulario: FormGroup;
  item: Consultas = new Consultas();
  tipoUsuario = [];
  tipoUsuarioLogado: number = 0;
  horaConsulta: Date;
  especialidades: Especialidades[];
  profissionais: User[];
  disabledDates: Date[]

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConsultasEditComponent>,
    private service: ConsultasService,
    private messageService: MessageService,
    private authenticationService: AuthService,
    private especialidadesService: EspecialidadesService,
    private usuariosService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

    this.especialidadesService.getAll().subscribe(res =>
      this.especialidades = res
    );

    this.getAllDisabledDate();
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

  getAllDisabledDate(){
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if(storedUser.responsavel > 0)
    {
      this.service.getAllDisabledDate(storedUser.responsavel).subscribe(res=>{
        console.log(res)
        this.disabledDates = res.map(consulta => consulta.data);
      });
    }    
  }

  getEspecialistas(){
    this.usuariosService.getAllProfissional(this.meuFormulario.get('especialidadeProfissional').value).subscribe(res =>
      this.profissionais = res
    );
  }

  createForm() {
    this.meuFormulario = this.fb.group({
      especialidadeProfissional: ['', Validators.required],
      idProfissional: [this.item.idProfissional, [Validators.required]],
    });
  }

  prepareItem(): Consultas {
    const controls = this.meuFormulario.controls;
    this.item.idProfissional = controls['idProfissional'].value;

    return this.item;
  }

  onSubmit() {
    // if (this.meuFormulario.valid) {
    const editedItem = this.prepareItem();
    editedItem.idPaciente = this.authenticationService.currentUserValue.id;
    editedItem.status = 0;

    if (editedItem.id > 0) {
      this.update(editedItem);
    } else {
      this.create(editedItem);
    }
    // } else {
    //   this.messageService.openWarningSnackBar('Formulário inválido. Corrija os erros.');
    // }
  }

  create(item) {
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


  onDatetimeSelected(datetime: Date): void {
    console.log(datetime)
    this.item.data = datetime;
  }
}
