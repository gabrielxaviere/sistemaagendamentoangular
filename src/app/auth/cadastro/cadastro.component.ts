import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  }

  createForm() {
    this.meuFormulario = this.fb.group({
      nome: [this.item.nome, [Validators.required]],
      sobrenome: [this.item.sobrenome, [Validators.required]],
      email: [this.item.email, [Validators.required, Validators.email]],
      password: [this.item.senha, [Validators.required]]
    });
  }

  prepareItem(): User {
    const controls = this.meuFormulario.controls;

    this.item.nome = controls['nome'].value;
    this.item.sobrenome = controls['sobrenome'].value;
    this.item.email = controls['email'].value;
    this.item.senha = controls['password'].value;

    return this.item;
  }
  
  cadastrar() {
    
    const editedItem = this.prepareItem();
    editedItem.tipo = 0;
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
}
