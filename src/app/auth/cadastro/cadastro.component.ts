import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/core/models/enumtipousuario';
import { Especialidades } from 'src/app/core/models/especialidades';
import { User } from 'src/app/core/models/user';
import { EspecialidadesService } from 'src/app/core/service/especialidades.service';
import { MessageService } from 'src/app/core/service/message.service';
import { UsuariosService } from 'src/app/core/service/usuarios.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  meuFormulario: FormGroup;
  item: User = new User(); 
  tipoUsuario:any;
  administradores: User[];
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private service: UsuariosService,
    private messageService: MessageService,
    private especialidadesService: EspecialidadesService,
    ) { }

  ngOnInit(): void {    
    this.item = new User();
    this.item.clear();

    console.log(this.item)
    this.createForm();

    this.tipoUsuario = [
      { id: 0, nome: 'Administrador' },
      { id: 2, nome: 'Paciente' }];

      this.service.getAByTipo(TipoUsuario.ADMIN.value).subscribe(x=> {
        this.administradores = x;
      });
  }

  createForm() {
    this.meuFormulario = this.fb.group({
      nome: [this.item.nome, [Validators.required]],
      sobrenome: [this.item.sobrenome, [Validators.required]],
      email: [this.item.email, [Validators.required, Validators.email]],
      password: [this.item.senha, [Validators.required]],
      tipo: [this.item.tipo, [Validators.required]],
      responsavel: [null]
    });
  }

  prepareItem(): User {
    const controls = this.meuFormulario.controls;

    this.item.nome = controls['nome'].value;
    this.item.sobrenome = controls['sobrenome'].value;
    this.item.email = controls['email'].value;
    this.item.senha = controls['password'].value;
    this.item.tipo = controls['tipo'].value
    this.item.responsavel = controls['responsavel'].value;

    return this.item;
  }
  
  cadastrar() {
    const editedItem = this.prepareItem();
    // editedItem.tipo = 0;
    this.service.create(editedItem).subscribe(res => {
      this.item = new User()
      this.messageService.openSuccessSnackBar('Operação realizada com sucesso.');
      this.goToLogin();
    }, err => {
      this.messageService.openErrorSnackBar('Ocorreu um erro ao processar a operação.');
    });
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  updateValidators(tipo){
    if(tipo == TipoUsuario.PACIENTE.value){
      this.meuFormulario.get('responsavel').setValidators([Validators.required]);
      this.meuFormulario.get('responsavel').updateValueAndValidity();
    }else{
      this.meuFormulario.get('responsavel').reset();
      this.meuFormulario.get('responsavel').setValidators([]);
      this.meuFormulario.get('responsavel').updateValueAndValidity();
      // 
    }
  }
}
