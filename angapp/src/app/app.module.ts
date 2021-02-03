import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import {AuthService} from './services/auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserProfileComponent,
    MyaccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
     {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true
     },
     AuthService,
     AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
