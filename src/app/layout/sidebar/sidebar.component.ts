import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TipoUsuario } from 'src/app/core/models/enumtipousuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  breadscrums = [
    {
      title: 'Table',
      items: ['Home'],
      active: 'Table'
    }
  ];
  tipousuario: number = 0;
  viewConsultas: boolean;
  viewUsuarios: boolean;
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,private router: Router,private cdr: ChangeDetectorRef, private authenticationService: AuthService) {}

  ngOnInit() {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.tipousuario = storedUser.tipo;

    if(storedUser.tipo == TipoUsuario.ADMIN.value)
    {
      this.viewConsultas = false;
      this.viewUsuarios = true;
    }else if(storedUser.tipo == TipoUsuario.ATENDENTE.value)
    {
      this.viewConsultas = true;
      this.viewUsuarios = true;
    }else 
    {
      this.viewConsultas = true;
      this.viewUsuarios = false;
    }   
  }

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    });
  }

  sair() {
    this.authenticationService.logout();
    location.reload();  
  }
}
