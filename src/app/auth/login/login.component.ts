import { AuthService } from './../../core/service/auth.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router,private renderer: Renderer2,private el: ElementRef, private service: AuthService) { }

  ngOnInit(): void {
    this.adicionarEstiloGradienteAoBody();
  }
  
  adicionarEstiloGradienteAoBody() {
    const body = this.el.nativeElement;
    this.renderer.setStyle(body, 'background', 'linear-gradient(to right, #3498db, #2c3e50)');
  }

  login() {    
    this.service.login(this.username, this.password).subscribe(res=>{
      this.router.navigate(['/']);
    });
  }

  goToSignup() {
    this.router.navigate(['auth/cadastro']);
  }
}
