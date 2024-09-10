import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from "./client/layout/layout.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { SecuriteModule } from './securite/securite.module';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { InterceptorTokenService } from './shared/services/AuthService/interceptor-token.service';
import { LayoutAdminModule } from './admin/layout-admin/layout-admin.module';

// Importation des modules Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    AdminModule,
    SecuriteModule,
    HttpClientModule,
    LayoutModule,
    LayoutAdminModule,
    BrowserAnimationsModule,

    //Import de angular matrial
    BrowserAnimationsModule,  
    MatButtonModule,    
    MatInputModule,          
    MatCardModule,          
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    MatIconModule,
],
  providers: [
   { 
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorTokenService, 
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
