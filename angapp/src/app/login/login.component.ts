import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { RegistrationComponent } from './../registration/registration.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData = {email : '', password : ''};
  submitted = false;
  errorMsg = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfileObs().subscribe(profile =>
    this.loginData = profile);
  }

  onSubmit(userform){
    console.log("success ",this.loginData.email);
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Dashboard'])
      },
      err => this.errorMsg = err.statusText
    );
    
  }
}
