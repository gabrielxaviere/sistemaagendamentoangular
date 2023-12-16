import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from 'src/app/core/service/usuarios.service';
import { User } from 'src/app/core/models/user';
import { MessageService } from 'src/app/core/service/message.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete/delete-confirmation.component';
import { ConsultasEditComponent } from '../edit/consultas-edit.component';
import { ConsultasService } from 'src/app/core/service/consultas.service';
import { Consultas } from 'src/app/core/models/consulta';
import { CancelConfirmationComponent } from 'src/app/shared/components/cancel/cancel-confirmation.component';
import { TipoUsuario } from 'src/app/core/models/enumtipousuario';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.scss']
})
export class ConsultasListComponent implements AfterViewInit {
  listaUsuarios: MatTableDataSource<Consultas>;
  breadscrums = [
    {
      title: 'Sistema de agendamento de consultas',
      items: ['Home'],
      active: 'Consultas'
    }
  ];
  myForm: FormGroup;
  register: UntypedFormGroup;
  displayedColumns: string[] = ['idPaciente', 'data', 'status', 'acoes'];
  filterName: string = "";
  filterData: Date = null;
  filterStatus: number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: ConsultasService, private messageService: MessageService) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    this.getAll();
  }

  getAll() {
    let idUsuario = null;
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser.tipo == TipoUsuario.PACIENTE) {
      idUsuario = storedUser.id;
    }

    this.service.getAll(this.filterName, this.filterData, this.filterStatus, storedUser.responsavel, idUsuario).subscribe(res => {
      this.listaUsuarios = new MatTableDataSource<Consultas>(res);
      this.listaUsuarios.paginator = this.paginator;
      console.log(this.listaUsuarios);
      console.log(this.listaUsuarios.data.length);
    }, err => {
      console.error('Erro ao fechar o dialog:', err);
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formulário válido:', this.myForm.value);
    } else {
      console.log('Formulário inválido.');
    }
  }

  openDialog(id: number) {
    const item = new Consultas();
    item.clear();

    if (id > 0) {
      item.id = id;
    }

    const dialogRef = this.dialog.open(ConsultasEditComponent, { data: { item } });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    }, err => {
      console.error('Erro ao fechar o dialog:', err);
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    });
  }

  cancel(id: number) {
    const dialogRef = this.dialog.open(CancelConfirmationComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe(res => {
          this.getAll();
        }, err => {
          console.error('Erro ao fechar o dialog:', err);
          this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
        });
      }
    });
  }

  clearFilters() {
    this.filterName = null;
    this.filterData = null;
    this.filterStatus = null;
    this.getAll();
  }

  getStatusText(status: number, data: Date): string {
    const dataAtual = new Date();
    const datalist = new Date(data);

    if (dataAtual >= datalist && status != 1) {
      return 'Concluída';
    }

    switch (status) {
      case 0:
        return 'Agendada';
      case 1:
        return 'Cancelada';
      case 2:
        return 'Concluída';
      default:
        return 'Desconhecido';
    }
  }

  getStatusRowClass(status: number, data: Date): string {
    const dataAtual = new Date();
    const datalist = new Date(data);

    if (dataAtual >= datalist && status != 1) {
      return 'concluida-row';
    }

    if (status == 1) {
      return 'cancelada-row';
    }

    if (status == 0) {
      return 'agendado-row';
    }
  }

  mostrarCancelar(status: number, data: Date) {
    const dataAtual = new Date();
    const datalist = new Date(data);

    if (dataAtual >= datalist && status != 1) {
      return false;
    }
    if (status == 1) { 
      return false;
    }
    
    return true;
  }
}

