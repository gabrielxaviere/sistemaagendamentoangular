import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './shared/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LOCALE_ID } from '@angular/core';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    PagesModule,
    CoreModule,
    HttpClientModule,
    MaterialModule,
    ComponentsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
