import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosEditComponent } from '../edit/usuarios-edit.component';
import { UsuariosService } from 'src/app/core/service/usuarios.service';
import { User } from 'src/app/core/models/user';
import { MessageService } from 'src/app/core/service/message.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete/delete-confirmation.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements AfterViewInit {
  listaUsuarios: MatTableDataSource<User>;
  breadscrums = [
    {
      title: 'Sistema de agendamento de consultas',
      items: ['Home'],
      active: 'Consultas'
    }
  ];
  myForm: FormGroup;
  register: UntypedFormGroup;
  displayedColumns: string[] = ['nome', 'sobrenome', 'especialidade', 'tipo', 'acoes'];

  filterName: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: UsuariosService, private messageService: MessageService) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    this.getAll();
  }

  getAll() {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    this.service.getAll(this.filterName, storedUser.responsavel).subscribe(res => {
      this.listaUsuarios = new MatTableDataSource<User>(res);
      this.listaUsuarios.paginator = this.paginator;
    }, err => {
      console.error('Erro ao fechar o dialog:', err);
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    })
  }

  getEspecialidades(element: any){
    if(element?.especialidades?.descricao)
    {
      return element?.especialidades?.descricao
    }else{
      return ""
    }
  }

  clearFilters() {
    this.filterName = null;
    this.getAll();
  }

  openDialog(id: number) {
    const item = new User();
    item.clear();

    if (id > 0) {
      item.id = id;
    }

    const dialogRef = this.dialog.open(UsuariosEditComponent, { data: { item } });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    }, err => {
      console.error('Erro ao fechar o dialog:', err);
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
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

  getTipoText(status: number): string {
    switch (status) {
      case 0:
        return 'Administrador';
      case 1:
        return 'Profissional de saúde';
      case 2:
        return 'Paciente';
      case 3:
        return 'Atendente';
      default:
        return 'Desconhecido';
    }
  }
}