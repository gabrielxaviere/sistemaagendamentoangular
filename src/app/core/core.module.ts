import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { AuthService } from './service/auth.service';
import { UsuariosService } from './service/usuarios.service';
import { ConsultasService } from './service/consultas.service';
import { MessageService } from './service/message.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthGuard,
    DynamicScriptLoaderService,
    AuthService,
    UsuariosService,
    ConsultasService,
    MessageService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
